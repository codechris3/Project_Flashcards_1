import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteCard } from "../utils/api";

export default function Card({ card }) {
  const { deckId } = useParams();
  const history = useHistory();

  const handleDelete = async () => {
    const result = window.confirm("Are you sure you want to delete this card?");
    if (result) {
      deleteCard(card.id).then(history.push("/"));
    }
  };

  return (
    <div className="container">
      <div className="card col-md-10">
        <div className="row">
          <div className="col-md-6">
            <div className="card-body">
              <p className="card-text">{card.front}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <p className="card-text">{card.back}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card-body">
              <div className="text-left">
                <Link
                  to={`/decks/${deckId}/cards/${card.id}/edit`}
                  className="btn btn-secondary m-2"
                >
                  <span className="oi oi-pencil" /> Edit
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <div className="text-right">
                <button className="btn btn-danger m-2" onClick={handleDelete}>
                  <span className="oi oi-trash" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
