import styled from "styled-components";
import { format } from "date-fns";

const DottedLine = styled.hr`
  border-bottom: 2px dotted rgba(0, 0, 0, 0.15);
  height: 0;
  background: white;
`;

const Category = styled.h4`
  text-transform: uppercase;
`;

const Title = styled.h3`
  font-weight: 500;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 5rem;
`;

const CardContainer = styled.div`
  box-shadow: 0 0 10px lightgrey;
  border-radius: 5px;
  border-top: 5px solid #a77ca0;
`;

export default function ({
  title,
  image,
  link,
  author,
  authorLink,
  date,
  type,
  category,
}) {
  return (
    <CardContainer className="p-card">
      <div className="p-card__inner u-no-padding--top u-no-padding--bottom">
        <Category>{category}</Category>
      </div>
      <DottedLine />
      <div className="p-card__inner u-no-padding--top u-no-padding--bottom">
        <img className="p-card__image" src={image} height="160" />
        <a href={link} target="_blank">
          <Title>{title}</Title>
        </a>
        By <a href={authorLink} target="_blank">{author}</a> on{" "}
        {format(new Date(date), "dd MMM yyyy")}
      </div>
      <DottedLine />
      <div className="p-card__inner u-no-padding--top u-no-padding--bottom">
        {type}
      </div>
    </CardContainer>
  );
}
