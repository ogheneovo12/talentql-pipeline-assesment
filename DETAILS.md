# SOLUTION SPECIFICS

### PROBLEM STATEMENT

To build a paginated table using HTML, CSS, and Javascript

expected to populate the table with data fetched from [**_https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84_**](https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84). The data endpoint is paginated and expects a page parameter from 1–N, where N is the index of the page fetched.

 
#### The App State:
The application maintained a single mutable state property called **state**, which aids in keeping track of the current visible page and data fetched from the endpoint. The state had the following properties.

    interface  IState {
        currentPage: number;
        pageData: PageData;
    } 
    
    interface  IUserData {
         id: string;
         row: number;
         age: number;
         gender: "male" | "female";
      }

-   **currentPage**: currentPage property to keep track of the active page that is visible to the user. It is also used for handing previous and next navigation on the table.
-   **pageData:** property holds the current page data fetched from the endpoint
`type  PageData = Record<string, IUserData[]>[];`


**Methods:**

The application was divided into Seperate Unit methods that carries out independent and separate functionalities.
below are the following method used:

 - **showLoadingUi :** to display loader on page data fetch 
 - **hideLoadingUI:** to hide the  loader from screen
 
 - **handleNext:** handles forward page navigation, since fetching data for **page N**  returns  **page N  data** and **page N+1** data, so there's a check if   ** page N+1 **, exists in pageData Record, if it exists, then populate table without fetching from the server, but if it doesn't exist then **fetch page N + 1**  from server.
 
 - **handlePrevious:** handles backward page navigation,   this function  will exit ontime if we  areat  the first page  **(N=1)** ,  a check is made to see if **Page N-1** exists on pageData Record,  the table get's updated if found, if not fetch **Page N-1** from api.
 - **createTr and createTd**: They basically creates tables rows and table item respectively, containing  relevant table info,
 - **insertIntoDom**: once table rows have been generated from a page update, this methods inserts the newly created table rows into the Dom.
 - **fetchPageData:** takes page as a parameter, shows the loading ui, then  fetches that page  data , on success/errors hideLoadinUi is called, states get updated and table is redrawn;
 
### How Does This Work
On Page load, a request is made to fetch current page data, 
A check is made to disable the previous button if we are at the first page,
once the data is fetched successfully, the table get's updated with current page data.