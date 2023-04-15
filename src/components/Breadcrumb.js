import React from 'react';
import styled from 'styled-components';

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  color: rgba(154, 154, 176, 1);
  margin: 0 0 32px 0;
`;

const Separator = styled.span`
  margin: 0 8px;
`;

const Item = styled.span`
  &:last-child {
    color: rgba(59, 59, 59, 1);
    font-weight: 700;
  }
`

const BreadcrumbItem = ({ label, link }) => {
    if (link) {
        return (
            <Item>
        <a href={link}>{label}</a>
      </Item>
        );
    }
    return <span>{label}</span>;
};

const Breadcrumb = ({ items }) => {
    return (
        <BreadcrumbContainer>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <BreadcrumbItem {...item} />
                    {index < items.length - 1 && <Separator>/</Separator>}
                </React.Fragment>
            ))}
        </BreadcrumbContainer>
    );
};

export default Breadcrumb;
