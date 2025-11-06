import "../../styles/scss/vendors/categoryCard.scss";
import API_BASE_URL from "../../apiConfig.js";

export default function CategoryCard({ info }) {
  console.log(info);

  return (
    <div
      className="card"
      style={{ background: `url(${API_BASE_URL + info.image}) right/cover` }}
    >
      <div className="card__wrap">
        <div className="card__desc">
          <h3 className="card__desc-title">{info.name}</h3>
          <p className="card__desc-text">{info.description}</p>
        </div>
      </div>
    </div>
  );
}
