const TablePost = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal, listPost } = props;

  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Create Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listPost &&
            Array.isArray(listPost) &&
            listPost.map((item, index) => (
              <tr key={index}>
                <td>{item.post_id}</td>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>{item.created_date}</td>

                <td>
                  <button className="btn btn-secondary">View</button>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleShowUpdateModal(item)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShowDeleteModal(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePost;
