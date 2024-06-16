import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import "./main.css";
import { getChicago, getRijksmuseum } from "../api";
import { useEffect, useState } from "react";
import noImage from "./noimage.png";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import Toast from "react-bootstrap/Toast";

const imageTemplate = {
  id: null,
  title: null,
  image: null,
  url: null,
  source: null,
};

export default function () {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page"));
  const query = searchParams.get("q");
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chicagoNoResults, setChicagoNoResults] = useState(false);
  const [rijksmuseumNoResults, setRijksmuseumNoResults] = useState(false);
  const [lists, setLists] = useState({});
  const [totalResults, setTotalResults] = useState({
    chigago: 0,
    rijksmuseum: 0,
  });
  const [maxPages, setMaxPages] = useState(0);

  const [showInfo, setShowInfo] = useState(false);
  const [selectedImage, setSelectedImage] = useState(imageTemplate);
  const [showToast, setToastShow] = useState(false);
  const handleInfoClose = () => {
    setShowInfo(false);
    setToastShow(false);
  };
  const handleInfoShow = (image) => {
    setSelectedImage(image);
    setShowInfo(true);
  };

  const defaultResultsPerApi = 10;

  function goToPage(pageNavNum) {
    navigate(`/search?q=${query}&page=${pageNavNum}`);
  }

  const processChigagoData = (chigagoData) => {
    let images = [];

    for (const chigagoImage of chigagoData.data) {
      let image = { ...imageTemplate };
      image.id = chigagoImage.id;
      image.title = chigagoImage.title;
      if (chigagoImage.image_id == null) {
        image.image = noImage;
      } else {
        image.image = `https://www.artic.edu/iiif/2/${chigagoImage.image_id}/full/full/0/default.jpg`;
      }
      image.url = `https://www.artic.edu/artworks/${image.id}`;
      image.source = "The Art Institute of Chicago";
      images.push(image);
    }

    return images;
  };

  const processRijksmuseumData = (rijksmuseumData) => {
    let images = [];

    for (const rijksmuseumImage of rijksmuseumData.artObjects) {
      let image = { ...imageTemplate };
      image.id = rijksmuseumImage.id;
      image.title = rijksmuseumImage.title;
      image.image = rijksmuseumImage.webImage.url;
      image.url = rijksmuseumImage.links.web;
      image.source = "Rijksmuseum";
      images.push(image);
    }

    return images;
  };

  const getImages = () => {
    Promise.all([
      getChicago(query, page, defaultResultsPerApi),
      getRijksmuseum(query, page, defaultResultsPerApi),
    ]).then((res) => {
      const chigagoData = res[0];
      const rijksmuseumData = res[1];
      const chicagoTotalResults =
        chigagoData.pagination.total > 1000
          ? 1000
          : chigagoData.pagination.total;
      const rijksmuseumTotalResults =
        rijksmuseumData.count > 1000 ? 1000 : rijksmuseumData.count;
      console.log(chigagoData, rijksmuseumData);

      const newTotals = {
        ...totalResults,
        chigago: chicagoTotalResults,
        rijksmuseum: rijksmuseumTotalResults,
      };

      setTotalResults(newTotals);

      let images = [
        ...processChigagoData(chigagoData),
        ...processRijksmuseumData(rijksmuseumData),
      ];

      const maxPages = Math.ceil(
        (chicagoTotalResults + rijksmuseumTotalResults) / 20
      );

      setImages(images);
      setMaxPages(maxPages);

      if (chigagoData.data.length === 0) {
        setChicagoNoResults(true);
      } else if (rijksmuseumData.artObjects.length === 0) {
        setRijksmuseumNoResults(true);
      } else {
        setIsLoading(false);
      }
    });
  };

  const onChangeSelect = (event) => {
    const value = event.target.value;
    goToPage(value);
  };

  const addImageToList = (image, listKey) => {
    const listArray = lists[listKey];
    listArray.push(image);

    const updatedList = {
      ...lists,
      [listKey]: listArray,
    };

    localStorage.setItem("lists", JSON.stringify(updatedList));
    setToastShow(true);
  };

  useEffect(() => {
    if (chicagoNoResults) {
      const pageOffSet = Math.ceil(
        totalResults.rijksmuseum / defaultResultsPerApi
      );
      const pageDifference = page - pageOffSet - 1;
      const searchPage = page + pageDifference;

      Promise.all([
        getRijksmuseum(query, searchPage, defaultResultsPerApi),
        getRijksmuseum(query, searchPage + 1, defaultResultsPerApi),
      ]).then((res) => {
        let images = [
          ...processRijksmuseumData(res[0]),
          ...processRijksmuseumData(res[1]),
        ];
        setImages(images);
        setIsLoading(false);
      });
    }
  }, [chicagoNoResults]);

  useEffect(() => {
    if (rijksmuseumNoResults) {
      const pageOffSet = Math.ceil(
        totalResults.rijksmuseum / defaultResultsPerApi
      );
      const pageDifference = page - pageOffSet - 1;
      const searchPage = page + pageDifference;

      Promise.all([
        getChicago(query, searchPage, defaultResultsPerApi),
        getChicago(query, searchPage + 1, defaultResultsPerApi),
      ]).then((res) => {
        let images = [
          ...processChigagoData(res[0]),
          ...processChigagoData(res[1]),
        ];
        setImages(images);
        setIsLoading(false);
      });
    }
  }, [rijksmuseumNoResults]);

  useEffect(() => {
    setRijksmuseumNoResults(false);
    setChicagoNoResults(false);
    setIsLoading(true);
    getImages();

    if (localStorage.getItem("lists") == undefined) {
      localStorage.setItem("lists", JSON.stringify({}));
    }

    setLists(JSON.parse(localStorage.getItem("lists")));
  }, [page]);

  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="searchResult">
          <h3>Searching for: {query}</h3>
          <h3>
            Current Page: {page} out of {maxPages}
          </h3>
          {page !== 1 ? (
            <button onClick={() => goToPage(page - 1)}>Previous Page</button>
          ) : null}
          <select onChange={onChangeSelect} value={page}>
            {[...Array(maxPages)].map((x, i) => (
              <option value={i + 1} key={i}>
                Page {i + 1}
              </option>
            ))}
          </select>
          {(page == 1 || page !== maxPages) && maxPages != 1 ? (
            <button onClick={() => goToPage(page + 1)}>Next Page</button>
          ) : null}

          <div className="gallery">
            {images.map((data) => (
              <div
                className="imgBox"
                key={data.id}
                style={{ backgroundImage: `url(${data.image})` }}
                onClick={() => handleInfoShow(data)}
              >
                <p>{data.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal show={showInfo} onHide={handleInfoClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={2}>
            <div className="p-2">
              <img src={selectedImage.image} />
            </div>
            <div className="p-2">
              <a href={selectedImage.url}>
                View this artwork on the original website.
              </a>
            </div>
            <div className="p-2">
              <i>Source: {selectedImage.source}</i>
            </div>
            <Toast
              onClose={() => setToastShow(false)}
              show={showToast}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">Image added successfully.</strong>
              </Toast.Header>
              <Toast.Body>Added {selectedImage.title} to your list.</Toast.Body>
            </Toast>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleInfoClose}>
            Close
          </Button>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Add to my Lists
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {Object.keys(lists).map((listKey) => (
                <Dropdown.Item
                  key={listKey}
                  eventKey={listKey}
                  onClick={() => addImageToList(selectedImage, listKey)}
                >
                  {listKey}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
