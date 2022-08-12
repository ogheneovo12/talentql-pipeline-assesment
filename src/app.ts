/** START DEFINE TYPES AND INTERFACES **/
type PageData = Record<string, IUserData[]>[];
interface IState {
  currentPage: number;
  pageData: PageData;
}

interface IUserData {
  id: string;
  row: number;
  age: number;
  gender: "male" | "female";
}
interface IFetchResponse {
  results: PageData;
}

/** END DEFINE TYPES AND INTERFACES **/
/** DOM CONSTANTS  */

const tbody = document.querySelector<HTMLElement>("#tbody"), //insert rows into the table body
  prevBtn = document.querySelector<HTMLButtonElement>("#prev"), // button to navigate to previous page
  nextBtn = document.querySelector<HTMLButtonElement>("#next"), // button to navigate to next page
  pageIndicator = document.querySelector<HTMLElement>("#page_indicator"), //current page indicator
  loadingUi = document.querySelector<HTMLElement>(".loader-overlay"); // div to indicate page is loading

const BASE_URL = "https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84"; //BASE DATA API URL

const state: IState = {
  currentPage: 1,
  pageData: [],
};

const showLoadingUi = () => {
  if (loadingUi) {
    loadingUi.style.display = "flex";
  }
};

const hideLoadingUi = () => {
  if (loadingUi) {
    loadingUi.style.display = "none";
  }
};

const handleNext = () => {
  //CHECK IF PAGE N+1 EXIST IN RECORD
  if (getPageData(state.currentPage + 1)) {
    //update current page and then redraw table
    state.currentPage = state.currentPage + 1;
    insertIntoDom();
  } else {
    //FETCH PAGE FROM SERVER
    fetchPageData(state.currentPage + 1);
  }
};

const handlePrev = () => {
  //check if we are at start index and return
  if (state.currentPage <= 1) return;

  //CHECK IF PAGE N-1 EXIST IN RECORD
  if (getPageData(state.currentPage - 1)) {
    //update current page and then redraw table
    state.currentPage = state.currentPage - 1;
    insertIntoDom();
  } else {
    //FETCH PAGE FROM SERVER
    fetchPageData(state.currentPage - 1);
  }
};

const createTd = (textContent: string) => {
  const Td = document.createElement("td");
  Td.textContent = textContent;
  return Td;
};

const createTr = (rowData: IUserData, rowIndex: number) => {
  const Tr = document.createElement("tr");
  Tr.dataset["entryid"] = rowData.id;
  const startIndex = 5 * state.currentPage - 4;
  Tr.replaceChildren(
    createTd(`${startIndex + rowIndex} `),
    createTd(rowData.gender),
    createTd(`${rowData.age}`)
  );
  return Tr;
};

const getPageData = (N: number) => state.pageData[0][N]?.map(createTr);

const insertIntoDom = () => {
  const tableRows = getPageData(state.currentPage);
  tbody?.replaceChildren(...tableRows);
  if (pageIndicator) {
    pageIndicator.textContent = `${state.currentPage}`;
  }
  shouldDisablePrev();
};
const shouldDisablePrev = () => {
  if (prevBtn) {
    if (state.currentPage > 1) {
      prevBtn.disabled = false;
    } else {
      prevBtn.disabled = true;
    }
  }
};

const setState = (newState: IState) => {
  state.currentPage = newState?.currentPage;
  state.pageData = newState?.pageData;
};

const fetchPageData = (page = 1) => {
  showLoadingUi();
  fetch(`${BASE_URL}&page=${page}`)
    .then((response) => response.json())
    .then((data: IFetchResponse) => {
      setState({
        pageData: data.results,
        currentPage: page,
      });
      insertIntoDom();
      hideLoadingUi();
    });
};

prevBtn?.addEventListener("click", handlePrev);
nextBtn?.addEventListener("click", handleNext);

const startApp = async () => {
  shouldDisablePrev();
  fetchPageData();
};

document.addEventListener("DOMContentLoaded", startApp);
