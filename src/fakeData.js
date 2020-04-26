// 模拟数据库中的tables

export const taskTable = {
  data: [
    {
      id: 0,
      title: "Website needed for business",
      price: "50",
      place: "online",
      dueDate: "2020-03-22",
      status: "open",
      offers: [0, 1],
      posterId: 0,
      postDate: "2020-03-09 00:00:00",
      detail:
        "I have got to build a website for my own company and need a web developer to do this. Highly paid and negotiable price. Please contact me as soon as possible. Thank you!I have got to build a website for my own company and need a web developer to do this. Highly paid and negotiable price. Please contact me as soon as possible. Thank you!I have got to build a website for my own company and need a web developer to do this. Highly paid and negotiable price. Please contact me as soon as possible. Thank you!I have got to build a website for my own company and need a web developer to do this. Highly paid and negotiable price. Please contact me as soon as possible. Thank you!I have got to build a website for my own company and need a web developer to do this. Highly paid and negotiable price. Please contact me as soon as possible. Thank you!I have got to build a website for my own company and need a web developer to do this. Highly paid and negotiable price. Please contact me as soon as possible. Thank you!I have got to build a website for my own company and need a web developer to do this. Highly paid and negotiable price. Please contact me as soon as possible. Thank you!",
      questions: [
        {
          senderId: 1,
          messageContent: "Hi, I got a question!",
          postDate: "2020-03-12 01:00:00",
          replies: [
            {
              senderId: 0,
              messageContent: "What is your question?",
              postDate: "2020-03-13 01:00:00"
            },
            {
              senderId: 1,
              messageContent: "What is the maximum package you could offer?",
              postDate: "2020-03-13 11:00:00",
            }
          ]
        },
        {
          senderId: 2,
          messageContent: "Hi, I got another question! This question is very very very very very very very very very very very very very very very very very very long...",
          postDate: "2020-03-12 02:00:00",
          replies: []
        }
      ]
    },
    {
      id: 1,
      title: "Help with Site Speed for Wordpress",
      price: "150",
      place: "online",
      dueDate: "2020-03-10",
      status: "open",
      offers: null, //不要是[]
      posterId: 2,
      postDate: "2020-03-08 00:00:00",
      detail:
        "I need help with site speed for Wordpress. Please contact me as soon as possible. Thank you!!",
      questions: [
        {
          senderId: 1,
          messageContent: "Hi, I got a question!",
          postDate: "2020-03-12 01:00:00",
          replies: []
        },
        {
          senderId: 1,
          messageContent:
            "Sorry forgot to say, I also have another question...",
          postDate: "2020-03-12 02:00:00",
          replies: [
            {
              senderId: 2,
              messageContent: "I could answer you question now!",
              postDate: "2020-03-12 08:00:00"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Clean 2 Balconies",
      price: "70",
      place: "Waterloo NSW 2017, Australia",
      dueDate: "2020-03-07",
      status: "open",
      offers: [2, 7],
      posterId: 2,
      postDate: "2020-03-09 00:00:00",
      detail:
        "I need help with cleaning balconies. Please contact me as soon as possible. Thank you!!",
      questions: []
    },
    {
      id: 3,
      title: "Pick up 18ft Ski Boat. Manly to Balmain",
      price: "120",
      place: "Balmain NSW 2041, Australia",
      dueDate: "2020-03-21",
      status: "assigned",
      offers: [6],
      posterId: 0,
      postDate: "2020-03-08 00:00:00",
      detail:
        "I need help with picking up a boat. Please contact me as soon as possible. Thank you!!",
      questions: []
    },
    {
      id: 4,
      title: "Need transfer funds",
      price: "50",
      place: "online",
      dueDate: "2020-03-05",
      status: "assigned",
      offers: [4],
      posterId: 1,
      postDate: "2020-03-09 00:00:00",
      detail:
        "I need help with transfering funds. Please contact me as soon as possible. Thank you!!",
      questions: []
    },
    {
      id: 5,
      title: "Buy & deliver Coles shopping",
      price: "70",
      place: "Cabramatta NSW 2166, Australia",
      dueDate: "2020-03-07",
      status: "completed",
      offers: [5],
      posterId: 0,
      postDate: "2020-03-08 00:00:00",
      detail: "I need to buy and deliver coles shopping. Thank you!!",
      questions: []
    },
    {
      id: 6,
      title: "I NEED A PERSON TO SELL ME MASKS!!!!!",
      price: "90",
      place: "Lindfield 2070, Australia",
      dueDate: "2020-03-22",
      status: "reviewed",
      offers: [3],
      posterId: 2,
      postDate: "2020-03-20 00:00:00",
      detail:
        "Please help me out I am so desperated now because I got no mask at all! Someone",
      questions: []
    },
    {
      id: 7,
      title: "Website needed for business",
      price: "50",
      place: "online",
      dueDate: "2020-03-22",
      status: "open",
      offers: [0, 1],
      posterId: 0,
      postDate: "2020-03-09 00:00:00",
      detail:
        "I have got to build a website for my own company and need a web developer to do this. Highly paid and negotiable price. Please contact me as soon as possible. Thank you!I have got to build a website for my own company and need a web developer to do this. Highly paid and negotiable price. Please contact me as soon as possible. Thank you!I have got to build a website for my own company and need a web developer to do this. Highly paid and negotiable price. Please contact me as soon as possible. Thank you!I have got to build a website for my own company and need a web developer to do this. Highly paid and negotiable price. Please contact me as soon as possible. Thank you!I have got to build a website for my own company and need a web developer to do this. Highly paid and negotiable price. Please contact me as soon as possible. Thank you!I have got to build a website for my own company and need a web developer to do this. Highly paid and negotiable price. Please contact me as soon as possible. Thank you!I have got to build a website for my own company and need a web developer to do this. Highly paid and negotiable price. Please contact me as soon as possible. Thank you!",
      questions: [
        {
          senderId: 1,
          messageContent: "Hi, I got a question!",
          postDate: "2020-03-12 01:00:00",
          replies: [
            {
              senderId: 0,
              messageContent: "What is your question?",
              postDate: "2020-03-13 01:00:00"
            },
            {
              senderId: 1,
              messageContent: "What is the maximum package you could offer?",
              postDate: "2020-03-13 11:00:00",
            }
          ]
        },
        {
          senderId: 2,
          messageContent: "Hi, I got another question! This question is very very very very very very very very very very very very very very very very very very long...",
          postDate: "2020-03-12 02:00:00",
          replies: []
        }
      ]
    },
    {
      id: 8,
      title: "Help with Site Speed for Wordpress",
      price: "150",
      place: "online",
      dueDate: "2020-03-10",
      status: "open",
      offers: null, //不要是[]
      posterId: 2,
      postDate: "2020-03-08 00:00:00",
      detail:
        "I need help with site speed for Wordpress. Please contact me as soon as possible. Thank you!!",
      questions: [
        {
          senderId: 1,
          messageContent: "Hi, I got a question!",
          postDate: "2020-03-12 01:00:00",
          replies: []
        },
        {
          senderId: 1,
          messageContent:
            "Sorry forgot to say, I also have another question...",
          postDate: "2020-03-12 02:00:00",
          replies: [
            {
              senderId: 2,
              messageContent: "I could answer you question now!",
              postDate: "2020-03-12 08:00:00"
            }
          ]
        }
      ]
    },
    {
      id: 9,
      title: "Clean 2 Balconies",
      price: "70",
      place: "Waterloo NSW 2017, Australia",
      dueDate: "2020-03-07",
      status: "open",
      offers: [2, 7],
      posterId: 2,
      postDate: "2020-03-09 00:00:00",
      detail:
        "I need help with cleaning balconies. Please contact me as soon as possible. Thank you!!",
      questions: []
    },
    {
      id: 10,
      title: "Pick up 18ft Ski Boat. Manly to Balmain",
      price: "120",
      place: "Balmain NSW 2041, Australia",
      dueDate: "2020-03-21",
      status: "assigned",
      offers: [6],
      posterId: 0,
      postDate: "2020-03-08 00:00:00",
      detail:
        "I need help with picking up a boat. Please contact me as soon as possible. Thank you!!",
      questions: []
    },
    {
      id: 11,
      title: "Need transfer funds",
      price: "50",
      place: "online",
      dueDate: "2020-03-05",
      status: "assigned",
      offers: [4],
      posterId: 1,
      postDate: "2020-03-09 00:00:00",
      detail:
        "I need help with transfering funds. Please contact me as soon as possible. Thank you!!",
      questions: []
    },
    {
      id: 12,
      title: "Buy & deliver Coles shopping",
      price: "70",
      place: "Cabramatta NSW 2166, Australia",
      dueDate: "2020-03-07",
      status: "completed",
      offers: [5],
      posterId: 0,
      postDate: "2020-03-08 00:00:00",
      detail: "I need to buy and deliver coles shopping. Thank you!!",
      questions: []
    },
    {
      id: 13,
      title: "I NEED A PERSON TO SELL ME MASKS!!!!!",
      price: "90",
      place: "Lindfield 2070, Australia",
      dueDate: "2020-03-22",
      status: "reviewed",
      offers: [3],
      posterId: 2,
      postDate: "2020-03-20 00:00:00",
      detail:
        "Please help me out I am so desperated now because I got no mask at all! Someone",
      questions: []
    },
  ]
};

export const userTable = {
  data: [
    {
      id: 0,
      email: "zongyahou@gmail.com",
      password: "970802",
      username: "zongyahou--poster&tasker",
      photo: "https://img.icons8.com/doodle/48/000000/girl.png",
      rating: 4.8,
      completionRate: "98%",
      bankDetail: {
        name: "Zongya Hou",
        accountNumber: "12345678",
        accountBsb: "111222"
      },
      mobileNumber: "0460000000",
      dateOfBirth: "",
      billingAddr: {
        addressLine1: "Unit 201 5 Havilah Lane",
        addressLine2: "",
        suburb: "Lindfield",
        state: "NSW",
        postCode: "2070",
        country: "Australia",
      }
    },
    {
      id: 1,
      email: "soniahou@gmail.com",
      password: "970802",
      username: "sonia--tasker",
      photo: "https://img.icons8.com/cotton/64/000000/sexy-woman.png",
      rating: 4.5,
      completionRate: "95%",
      bankDetail: {
        name: "sonia",
        accountNumber: "87654321",
        accountBsb: "999000"
      },
      mobileNumber: "0469999999",
      dateOfBirth: "", // no dob
      billingAddr: {
        addressLine1: "Unit 123 YUJIANGYUAN, HUANGPU ROAD",
        addressLine2: "WUHAN NEW SQUARE",
        suburb: "JIANGAN",
        state: "HUBEI",
        postCode: "430010",
        country: "CHINA",
      }
    },
    {
      id: 2,
      email: "meiyazihzy@gmail.com",
      password: "970802",
      username: "meiyazi--poster&tasker",
      photo: "https://img.icons8.com/dusk/64/000000/cool.png",
      rating: 4.0,
      completionRate: "90%",
      bankDetail: {
        name: "Meiyazi",
        accountNumber: "00000000",
        accountBsb: "777888"
      },
      mobileNumber: "04666666666",
      dateOfBirth: "1982-08-30",
      billingAddr: {} // no billing address
    }
  ]
};

export const offerTable = {
  data: [
    {
      id: 0,
      taskId: 0,
      taskerId: 1,
      posterId: 0,
      price: "50",
      messages: [
        {
          senderId: 1,
          messageContent:
            "Hi, I can do this job. I have 10 YEARS of REACT experience!!! I could build a website from scratch. Wanna a further discussion?",
          postDate: "2020-03-10 19:41:00"
        }
      ]
    },
    {
      id: 1,
      taskId: 0,
      taskerId: 2,
      posterId: 0,
      price: "60",
      messages: [
        {
          senderId: 2,
          messageContent:
            "Hi, I could commit to do this job with a much lower price. Are you still looking for a tasker?",
          postDate: "2020-03-10 20:41:00"
        },
        {
          senderId: 0,
          messageContent:
            "Thank you for your offer! I do need a person to help me out now. When are you avaliable?",
          postDate: "2020-03-10 20:42:00"
        },
        {
          senderId: 2,
          messageContent:
            "I am free during this weekend. Could you please give me your number?",
          postDate: "2020-03-12 20:41:00"
        }
      ]
    },
    {
      id: 2,
      taskId: 1,
      taskerId: 1,
      posterId: 2,
      price: "175",
      messages: [
        {
          senderId: 1,
          messageContent:
            "Hi, I could commit to do this job!! Are you still looking for a tasker???",
          postDate: "2020-03-11 20:45:00"
        },
        {
          senderId: 2,
          messageContent:
            "Thank you for your offer!!! When are you avaliable???",
          postDate: "2020-03-11 20:46:00"
        }
      ]
    },
    {
      id: 3,
      taskId: 6,
      taskerId: 0,
      posterId: 2,
      price: "999",
      messages: [
        {
          senderId: 0,
          messageContent:
            "Hi, I got plenty of masks but 10 each. Could you afford it?",
          postDate: "2020-03-11 20:45:00"
        },
        {
          senderId: 2,
          messageContent:
            "Afford your mother afford!",
          postDate: "2020-03-11 20:46:00"
        }
      ]
    },
    {
      id: 4,
      taskId: 4,
      taskerId: 2,
      posterId: 1,
      price: "51",
      messages: [
        {
          senderId: 2,
          messageContent:
            "I could do this! What kind of fund do you need to transfer?",
          postDate: "2020-03-11 20:45:00"
        },
        {
          senderId: 1,
          messageContent:
            "I don't know hahaha.",
          postDate: "2020-03-11 20:46:00"
        }
      ]
    },
    {
      id: 5,
      taskId: 5,
      taskerId: 1,
      posterId: 0,
      price: "75",
      messages: [
        {
          senderId: 1,
          messageContent:
            "Although it is not good for keeping you fit, I could do this for you! ",
          postDate: "2020-03-11 20:45:00"
        },
        {
          senderId: 0,
          messageContent:
            "I am fit enough to skip exercise like this..",
          postDate: "2020-03-11 20:46:00"
        }
      ]
    },
    {
      id: 6,
      taskId: 3,
      taskerId: 1,
      posterId: 0,
      price: "1200",
      messages: [
        {
          senderId: 1,
          messageContent:
            "I could take a risk of possibly getting coronavirus with 1200 dollars. ",
          postDate: "2020-03-21 20:45:00"
        },
        {
          senderId: 0,
          messageContent:
            "Alright I see.",
          postDate: "2020-03-21 22:46:00"
        }
      ]
    },
    {
      id: 7,
      taskId: 2,
      taskerId: 0,
      posterId: 2,
      price: "100",
      messages: [
        {
          senderId: 0,
          messageContent:
            "I am good at cleaning balconies and my dream price is only 100 dollars!",
          postDate: "2020-03-21 20:45:00"
        },
        {
          senderId: 1,
          messageContent:
            "I may need to wait for a lower offer price.",
          postDate: "2020-03-21 22:46:00"
        }
      ]
    },
  ]
};

