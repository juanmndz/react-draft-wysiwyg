import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.css";

class Mention {
  constructor(className) {
    this.className = className;
  }
  renderMentionData = (description, status, value) => {
    // console.log(data, 'data')
    if (status === "critical") {
      return (
        <a className="tooltipx critical">
          {value}
          <span className="custom critical">
            <img
              src="https://rettex-images.s3.amazonaws.com/Critical.png"
              alt="Error"
              height="48"
              width="48"
            />
            <em>Critical</em>${description}
          </span>
        </a>
      );
    }
    if (status === "info") {
      return (
        <a className="tooltipx help">
          {value}
          <span className="custom help">
            <img
              src="https://rettex-images.s3.amazonaws.com/Help.png"
              alt="Help"
              height="48"
              width="48"
            />
            <em>Help</em>
            {description}
          </span>
        </a>
      );
    }
    return value;
  };
  getMentionComponent = () => {
    const className = this.className;
    const MentionComponent = ({ entityKey, children, contentState }) => {
      const { description, status, value } = contentState
        .getEntity(entityKey)
        .getData();
      const renderMention = this.renderMentionData(description, status, value);
      return (
        <React.Fragment>
          {renderMention}
          {children}
        </React.Fragment>
      );
    };
    MentionComponent.propTypes = {
      entityKey: PropTypes.number,
      children: PropTypes.array,
      contentState: PropTypes.object
    };
    return MentionComponent;
  };
  getMentionDecorator = () => ({
    strategy: this.findMentionEntities,
    component: this.getMentionComponent()
  });
}

Mention.prototype.findMentionEntities = (
  contentBlock,
  callback,
  contentState
) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "MENTION"
    );
  }, callback);
};

module.exports = Mention;
