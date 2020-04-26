import { ajax } from "./ajax";
import { taskTable, userTable, offerTable } from "../fakeData";
import '../config';
const { BASE } = global.constants;

// TODO @SONIA
// reqPostTask
export const reqLogin = (email, password) => {
  return ajax(`${BASE}/login`, { email, password }, "POST");
};

export const reqSignUp = userInfo => {
  return ajax(`${BASE}/signup`, userInfo, "POST");
};

export const reqTaskList = (page, pageSize) => {
  return ajax(BASE + "/task/list", { page, pageSize });

  //模拟后台数据库对多张表查询后返回的数据
  const mockedData = taskTable.data.map(task => {
    return {
      ...task,
      offers: task.offers ? `${task.offers.length} offer${task.offers.length > 1 ? 's' : ''}` : `0 offer`, //注意这里task offer可能是null
      photo: userTable.data.find(obj => obj.id === task.posterId).photo
    };
  });

  return Promise.resolve({ status: 0, data: mockedData });
};


export const reqTaskDetail = taskId => {
  return ajax(BASE + `/task/${taskId}`);

  //模拟后台数据库对多张表查询后返回的数据
  const taskData = taskTable.data[parseInt(taskId)];
  let offers = [];
  if (taskData.offers) {
    offers = taskData.offers.map(offerId =>
      offerTable.data.find(obj => obj.id === offerId)
    );
  }
  offers = offers.map(offer => ({
    ...offer,
    ...userTable.data.find(obj => obj.id === offer.taskerId),
    messages: offer.messages.map(message => ({
      ...message,
      ...userTable.data.find(obj => obj.id === message.senderId)
    }))
  }));
  const mockedData = {
    ...taskTable.data[parseInt(taskId)],
    posterName: userTable.data.find(obj => obj.id === taskData.posterId)
      .username,
    posterEmail: userTable.data.find(obj => obj.id === taskData.posterId)
      .email,
    // taskerEmail: taskData.offers ? taskData.offers[0].email : '',//userTable.data.find(obj => obj.id === taskData.offers[0].posterId).email : '',
    offers: offers,
    photo: userTable.data.find(obj => obj.id === taskData.posterId).photo,
    questions: taskData.questions.map(question => ({
      ...question,
      ...userTable.data.find(obj => obj.id === question.senderId),
      replies: question.replies.map(reply => ({
        ...reply,
        ...userTable.data.find(obj => obj.id === reply.senderId)
      }))
    }))
  };
  return Promise.resolve({ status: 0, data: mockedData });
};

export const reqPostTask = (email, taskData) => {
  return ajax(BASE + `/task/add`, { email: email, taskData: taskData }, "POST");
}

export const reqUpdateTask = (taskId, taskData) => {
  return ajax(BASE + `/task/update/${taskId}`, taskData, "PUT");// if method is post， 405 method not allowed！

  // const taskData = taskTable.data.find(task => task.id === taskId);
  // const mockedData = { ...taskData, ...updatedData }
  // return Promise.resolve({ status: 0, data: mockedData });
}

export const reqUserInfo = email => {
  return ajax(BASE + "/user/info", { email });

  // //模拟后台数据库对多张表查询后返回的数据
  // const mockedData = userTable.data.find(obj => {
  //   return obj.email === userEmail;
  // });

  // return Promise.resolve({
  //   status: Number(mockedData === undefined),
  //   data: mockedData
  // });
};

export const reqUpdateUser = (email, userData) => {
  return ajax(BASE + '/user/update', { email, userData }, 'PUT')
  // return Promise.resolve({ status: 0, data: userData });
  // 一定要return，否则调用reqxxx函数时会出现cannot read property status of undefined错误
}

export const reqUploadAvatar = (email, formData) => {
  return ajax(BASE + `/user/upload-avatar/${email}`, formData, 'POST', true)
  // return Promise.resolve({ status: 0, data: "/logo192.png" });
}

export const reqMakeOffer = (email, offerData) => {
  return ajax(BASE + '/offer/add', { email, offerData }, 'POST')
}

export const reqPostQuestion = (email, questionData) => {
  return ajax(BASE + '/task/add-question', { email, questionData }, 'POST')
}

export const reqReplyQuestion = (email, questionData) => {
  return ajax(BASE + '/task/reply-question', { email, questionData }, 'POST')
}

export const reqPostOfferMessage = (email, messageData) => {
  return ajax(BASE + '/offer/add-message', { email, messageData }, 'POST')
}