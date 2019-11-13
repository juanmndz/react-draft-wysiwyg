import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.css";

class Mention {
  constructor(className) {
    this.className = className;
  }
  renderMentionData = (description, status, value, text, children) => {
    console.log(description, status, value, text, "data");
    switch (status) {
      case 'critical':
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
              <em>{value}</em>{description}
            </span>
            {children}
          </a>
        );
      case 'info':
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
              <em>{value}</em>
              {description}
            </span>
            {children}
          </a>
        );
      default:
        return (
          <a>
            {value}
            {children}
          </a>
        );
    }
  };
  getMentionComponent = () => {
    const className = this.className;
    const MentionComponent = ({ entityKey, children, contentState }) => {
      const { description, status, value, text } = contentState
        .getEntity(entityKey)
        .getData();
      const renderMention = this.renderMentionData(
        description,
        status,
        value,
        text,
        children
      );
      return <React.Fragment>{renderMention}</React.Fragment>;
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
