//import {format} from "date-fns"
//import Form from "react-bootstrap/Form";

export const COLUMNS = [
  {
    Header: "###",
    Footer: "ID",
    accessor: "",
    /*Cell: () => {
      return <Form.Check type="checkbox" label="" />;
    },*/
    disableFilters: true,
  },
  {
    Header: "ID",
    Footer: "ID",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Last Name",
    Footer: "Last Name",
    accessor: "last_name",
  },
  {
    Header: "Date of Birth",
    Footer: "Date of Birth",
    accessor: "date_of_birth",
    /*Cell : ({value} ) => {
            return format(new Date(value),"dd/MM/yyyy")
        },*/
    disableFilters: true,
  },
  {
    Header: "Gender",
    Footer: "Gender",
    accessor: "gender",
  },
  {
    Header: "Country",
    Footer: "Country",
    accessor: "country",
    disableFilters: true,
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "phone",
  },
  {
    Header: "Actions",
    Footer: "Phone",
    accessor: "",
    disableFilters: true,
    /*Cell: (column)=>{
            return (
                <>
                <button onClick={()=> console.log(column.cell.row.original.id)}>Edit</button>
                <button onClick={()=> props.deleteContact(column.cell.row.original.id)}>Delete</button>
                </>
            )
        }*/
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: "ID",
    Footrer: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "Name",
    columns: [
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
      },
    ],
  },
  {
    Header: "INFO",
    Footer: "INFO",
    columns: [
      {
        Header: "Date of Birth",
        Footer: "Date of Birth",
        accessor: "date_of_birth",
      },
      {
        Header: "Country",
        Footer: "Country",
        accessor: "country",
      },
      {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
      },
    ],
  },
];
