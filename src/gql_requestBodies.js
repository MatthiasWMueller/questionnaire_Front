const config = require('./config.json');

export const sendQraphQlRequest = (requestBody, token) => {
    let headers;
    if(token){
        headers = {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
          };
    } else {
        headers = {
            'Content-Type': 'application/json'
          };
    }
    return fetch(config.apiURL, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: headers
          })
          // continue:
          // .then(res => {
          //    if(res.status === 200) ...
          // ...
          // return res.json();
}

export const getHeaders = (token) => {
  let headers;
    if(token){
        headers = {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
          };
    } else {
        headers = {
            'Content-Type': 'application/json'
          };
    }
    return headers;
}

export const saveAnswer = async (questionID, user, value, token, chapter) =>  {
  try {
    const requestBody = saveAnswer_gql(questionID, user, value, chapter);
    const headers = getHeaders(token);
    const result =  await fetch(config.apiURL, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: headers
      });
    const y = await result.json();
    const q = await y.data;
    console.log(q);
  } catch (error) {}

}


// ----------------------------------------------------------------- 




const saveAnswer_gql = (questionID, user, value, chapter) => {
  const requestBody = {
    query: 
    `mutation {saveAnswer(
      id:"${questionID}" 
      user: "${user}"
      value: ${value}
      chapter: ${chapter}
      )
    }`
  };
  return requestBody;
}

 

export const getQuestions_gql = (chapter, user) => {
  let requestBody;
    requestBody = {
      query: 
      `query {questions(chapter:${chapter}, user: "${user}") {
        id,
        left,
        right,
        value
      }}`
    };

  return requestBody;
}


export const adminSaveQuestion_gql = (params) => {
   const requestBody = {
      query: 
      `mutation {saveQuestion(id: "${params.id}", left:"${params.left}", right:"${params.right}", chapter:${params.chapter} )}`
    };
  return requestBody;
}



export const getTotalStats_gql = (user) => {
  let requestBody;
    requestBody = {
      query: 
      `query{getStatsTotal(user: "${user}") {
        totalAVG
        answerProg
        chapterAVGs
      }}`
    };
  return requestBody;
}



export const getChapterStats_gql = (user, chapter) => {
  let requestBody;
    requestBody = {
      query: 
      `query{getStatsChapter(user: "${user}", chapter: ${chapter}){
        chapterScore
        valueCounts
      }}`
    };
  return requestBody;
}

