import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .pagination-previous-next,
  .pagination-item,
  .pagination-break {
    margin: 0 2px;
    padding: 4px 8px;
    border: 1px solid #ddd;
    border-radius: 3px;
    cursor: pointer;
    background-color: white;
    color: black;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #e2e2e2;
    }
  }

  .pagination-item.active {
    background-color: #3182ce;
    color: white;
  }

  .pagination-previous-next {
    margin-right: 3px;
    margin-left: 3px;
  }
`;
