import React from "react";
import PropTypes from "prop-types";

function TechItem(props) {
  return (
    <li>
      {props.tech}
      <button type="button" onClick={props.onDelete}>
        Remover!
      </button>
    </li>
  );
}

TechItem.defaultProps = {
  tech: "Oculto"
};

TechItem.propTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired
};

export default TechItem;
