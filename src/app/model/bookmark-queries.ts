import gql from 'graphql-tag';

export const QUERY_GET_BOOKMARK = gql`
query getSingleCourse($id: String!) {
    bookMark(id: $id) {
      id
      name
      url
      group
  }
}
`;

export const QUERY_GET_BOOKMARKS = gql`
query getBookMarks {
    bookMarks {
    id
    name
    url
    group
  }
}
`;

export const QUERY_ADD_BOOKMARK = gql`
mutation addBookMark($name: String!, $url: String!, $group: Group!) {
    addBookMark(name: $name, url: $url, group: $group) {
    id
    name
    url
    group
  }
}
`;

export const QUERY_UPDATE_BOOKMARK = gql`
mutation updateBookMark($id: String!, $name: String!, $url: String!, $group: Group!) {
    updateBookMark(id: $id, name: $name, url: $url, group: $group)
}
`;

export const QUERY_DELETE_BOOKMARK = gql`
mutation deleteBookMark($id: String!) {
    deleteBookMark(id: $id)
}
`;