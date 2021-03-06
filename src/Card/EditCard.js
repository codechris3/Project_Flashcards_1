import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";
import CardForm from "./CardForm";

export default function EditCard() {
  const { deckId, cardId } = useParams();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(undefined);
  const [deck, setDeck] = useState({});

  useEffect(() => {
    readCard(cardId).then(setFormData);
    readDeck(deckId).then(setDeck);
  }, [cardId, deckId]);

  const handleChange = ({ target }) => {
    const value = target.value;

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleReset = (event) => {
    readCard(cardId).then(setFormData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateCard(formData, abortController.signal).then().catch(setError);

    if (error) {
      return <ErrorMessage error={error} />;
    }
  };

  if (formData && deck) {
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">
                <span className="oi oi-home" /> Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Card {`${cardId}`}
            </li>
          </ol>
        </nav>
        <h1>Edit Card</h1>
        <CardForm
          formData={formData}
          handleChange={handleChange}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
        />
      </>
    );
  }
}
