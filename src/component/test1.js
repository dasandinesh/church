@page {
    size: A5;
  }
  /* Modal */
  
  .modal {
    display: block; /* Ensure the modal is displayed */
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  }
  
  /* Modal content */
  .modal-content {
    background-color: #fefefe;
    margin: 7% auto; /* 20% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
  }
  
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  .table-wrapper {
    overflow-x: auto;
  }
  
  .table-wrapper table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table-wrapper th,
  .table-wrapper td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .table-wrapper th {
    background-color: #f2f2f2;
  }
  