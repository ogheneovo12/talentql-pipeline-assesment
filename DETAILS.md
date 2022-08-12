# SOLUTION SPECIFICS

### PROBLEM STATEMENT

To build a paginated table using HTML, CSS, and Javascript

expected to populate the table with data fetched from [**_https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84_**](https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84). The data endpoint is paginated and expects a page parameter from 1–N, where N is the index of the page fetched.

 
#### The App State:
In order to keep track of the current visible page and the data obtained from the endpoint, the application maintained a single mutable state property called **state**.

These characteristics applied to the state.

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

-   **currentPage**: The **currentPage** attribute is used to record the active page that the user can see. Additionally, it is utilized to provide prior and subsequent navigation on the table.
-   **pageData:** This attribute contains the most recent page information retrieved from the endpoint.
`type  PageData = Record<string, IUserData[]>[];`


**Methods:**

The application was split up into different unit methods that perform independent and distinct tasks.
The Methods employed are as follows:

 - **showLoadingUi :**  shows the loader while fetching page data.
 - **hideLoadingUI:**  removes the loader from view once the data has been retrieved.
 
 - **handleNext:** manages forward page navigation because retrieving data for ***page N*** yields both ***page N*** and ***page N+1*** data, so there is a check to see if ***page N+1*** exists in the ***pageData*** Record; if it does, the table is populated without retrieving from the server; however, if it doesn't, ***page N + 1*** must be retrieved from the server.
 
 - **handlePrevious:** handles backward page navigation; if we are on the first page ***(N=1)***, this method will terminate on-time without requesting data from the server or ***pageData*** Records.
The pageData Record is checked to determine if ***page N-1*** already exists; if it does, the table is updated; if not, ***page N-1*** is fetched from the API.
 - **createTr and createTd**: They essentially produce table rows **(tr)** and table item **(td)** elements, each of which contains pertinent table information.
 - **insertIntoDom**: This method inserts the newly constructed table rows into the Dom once the table rows have been generated from a page update.
 - **fetchPageData:** takes page as an input, displays the loading UI, retrieves the page's contents, and hides the loading message based on success or failure. States are updated and the table UI is redrew.
 
### How Does This Work
A request is performed to fetch the first page's ***(N=1)*** data when the page loads.
If the previous button has to be disabled, ***shouldDisablePrev()*** is invoked.
The table is updated with the most recent page data as soon as the data is successfully fetched.
When moving forward (by clicking the next button), server requests are only made for odd pages. Because the api returns both ***N*** and ***N+1*** data for every page requested, when moving backward (by clicking the previous button), ***fetchPageData()*** is always called to get the most recent ***N-1*** data, as long as ***N-1*** doesn't go below **1**.
