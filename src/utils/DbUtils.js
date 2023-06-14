import { fetchGetRfpsUrl, fetchGetPreprocessUrl, fetchGetPeopleUrl,
  fetchGetResponsesUrl, fetchGetPreProcessLinksUrl } from '../assets/constants';

export function getRfps() {
  return (
    fetch(`${fetchGetRfpsUrl}`)
    .then(response => response.json())
    .then(myJson => localStorage.setItem('rfp_data', JSON.stringify(myJson.rfp_data)))
  );
}

export function getResponses() {
  return (
    fetch(`${fetchGetResponsesUrl}`)
    .then(response => response.json())
    .then(myJson => localStorage.setItem('responses_data', JSON.stringify(myJson.responses_data)))
  );
}


export function deleteRfp(item_id) {
    const oldList = JSON.parse(localStorage.getItem('rfp_data'));
    const newList = oldList.filter(x => x._id !== item_id);
    localStorage.setItem('rfp_data', JSON.stringify(newList));
}

export function addRfp(rfpRecordObject) {
  const oldList = JSON.parse(localStorage.getItem('rfp_data'));
  const newList = [rfpRecordObject, ...oldList];
  localStorage.setItem('rfp_data', JSON.stringify(newList));
}

export function setRfps(rfps) {
  localStorage.setItem('rfp_data', JSON.stringify(rfps));
}

export function getRfp(item_id) {
  return JSON.parse(localStorage.getItem('rfp_data')).filter(item => item._id === item_id)[0];
}

export function getPreprocessData() {
  return (
    fetch(`${fetchGetPreprocessUrl}`)
    .then(response => response.json())
    .then(myJson => localStorage.setItem('pre_process_data', JSON.stringify(myJson.pre_process_data)))
  );
}

export function getPeople() {
  return (
    fetch(`${fetchGetPeopleUrl}`)
    .then(response => response.json())
    .then(myJson => localStorage.setItem('people_data', JSON.stringify(myJson.people)))
  );
}

export function getPreprocessLinks() {
  fetch(`${fetchGetPreProcessLinksUrl}`)
  .then(response => response.json())
  .then(myJson => localStorage.setItem('pre_process_links', JSON.stringify(myJson.pre_process_links)))
}