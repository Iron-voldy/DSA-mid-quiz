// light dark switch section
const toggleSwitch = document.querySelector('.light-dark-switch input[type="checkbox"]');
document.querySelector(".start-menu").classList.toggle("visible")

function switchMode(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchMode, false);

var quizButtons = document.querySelectorAll(".quiz-type");
var quizType;

for (var i = 0; i < quizButtons.length; i++) {
    quizButtons[i].addEventListener("click", function () {
        quizType = this.id;
        questionScreen(quizType);
    })
}

function questionScreen(type) {
    document.querySelector(".start-menu").classList.toggle("visible")
    setSubjectBars(type)
    document.querySelector(".question-screen").classList.toggle("visible")

    //retrieve quiz data based on selection
    getQuiz(type);
}

function setSubjectBars(type) {
    var bars = document.querySelectorAll(".curr-subject");
    for (let bar of bars) {
        bar.lastElementChild.innerHTML = type
        if (type == "HTML") {
            bar.firstElementChild.firstElementChild.src = "./assets/images/icon-html.svg"
        }
        else if (type == "CSS") {
            bar.firstElementChild.firstElementChild.src = "./assets/images/icon-css.svg"
        }
        else if (type == "JavaScript") {
            bar.firstElementChild.firstElementChild.src = "./assets/images/icon-js.svg"
        }
        else {
            bar.firstElementChild.firstElementChild.src = "./assets/images/icon-accessibility.svg"
        }
        bar.style.visibility = "visible"
    }
}

var quizChosen;
var qCount = -1;
var totalQuestions;
var score = 0;
var submit = document.querySelector(".submit-answer");
var increment;

// Embed quiz data directly to avoid CORS issues when running locally

const quizData = 
{
  "quizzes": [
    {
      "title": "q8",
      "questions": [
        {
          "question": "To maintain __________ in academic writing, sentences should be concise and free from unnecessary complexity.",
          "options": [
            "Clarity",
            "Obscurity",
            "Ambiguity",
            "Confusion"
          ],
          "answer": "Clarity"
        },
        {
          "question": "Which of the following is NOT a feature of academic writing?",
          "options": [
            "Precision",
            "Slang",
            "Formality",
            "Objectivity"
          ],
          "answer": "Slang"
        },
        {
          "question": "The use of __________ point of view is common in academic writing to maintain objectivity and remove personal bias.",
          "options": [
            "First-person",
            "Third-person",
            "Second-person",
            "Passive voice"
          ],
          "answer": "Third-person"
        },
        {
          "question": "What is a key characteristic of academic writing?",
          "options": [
            "Use of contractions",
            "Personal anecdotes",
            "Formal tone",
            "Colloquial expressions"
          ],
          "answer": "Formal tone"
        },
        {
          "question": "In academic writing, __________ helps to avoid overstatement and presents information as cautiously as possible.",
          "options": [
            "Hedging",
            "Assurance",
            "Exaggeration",
            "Empathy"
          ],
          "answer": "Hedging"
        },
        {
          "question": "Which of the following expressions is considered informal and should be avoided in academic writing?",
          "options": [
            "Therefore",
            "For instance",
            "A lot",
            "In addition"
          ],
          "answer": "A lot"
        },
        {
          "question": "Academic writing requires __________ sentences that convey clear and specific ideas.",
          "options": [
            "Complex",
            "Simple",
            "Compound",
            "Incomplete"
          ],
          "answer": "Complex"
        },
        {
          "question": "Which of the following would be considered an inappropriate phrase in academic writing?",
          "options": [
            "According to the research",
            "The study shows that",
            "You should know that",
            "The findings indicate"
          ],
          "answer": "You should know that"
        },
        {
          "question": "In academic writing, __________ language should be used to avoid subjective opinions.",
          "options": [
            "Personal",
            "Impersonal",
            "Informal",
            "Slang"
          ],
          "answer": "Impersonal"
        },
        {
          "question": "Which of the following is essential for objectivity in academic writing?",
          "options": [
            "Expressing personal feelings",
            "Use of first-person pronouns",
            "Avoiding biased language",
            "Using casual tone"
          ],
          "answer": "Avoiding biased language"
        },
        {
          "question": "Academic writing should avoid the use of __________ questions, as they are considered informal.",
          "options": [
            "Rhetorical",
            "Functional",
            "Clarifying",
            "Direct"
          ],
          "answer": "Rhetorical"
        },
        {
          "question": "Which of the following is NOT a feature of academic writing?",
          "options": [
            "Use of proper citation",
            "Overuse of technical jargon",
            "Logical structure",
            "Clear focus on the topic"
          ],
          "answer": "Overuse of technical jargon"
        },
        {
          "question": "To ensure __________ in academic writing, it is important to maintain the same terminology throughout the text.",
          "options": [
            "Consistency",
            "Contradiction",
            "Ambiguity",
            "Confusion"
          ],
          "answer": "Consistency"
        },
        {
          "question": "Which of the following is most appropriate for formal academic writing?",
          "options": [
            "Can't",
            "Cannot",
            "Won't",
            "Don't"
          ],
          "answer": "Cannot"
        },
        {
          "question": "__________ allows writers to express caution and avoid making overly strong claims.",
          "options": [
            "Hedging",
            "Exaggeration",
            "Overstatement",
            "Clarification"
          ],
          "answer": "Hedging"
        },
        {
          "question": "Which of the following would be an acceptable approach in academic writing?",
          "options": [
            "Using contractions like \"don't\" and \"won't\"",
            "Using a formal tone and complete sentences",
            "Using slang terms such as \"cool\" and \"stuff\"",
            "Writing in a personal, informal style"
          ],
          "answer": "Using a formal tone and complete sentences"
        },
        {
          "question": "When referencing sources in academic writing, __________ quotations are often used to support your arguments.",
          "options": [
            "Direct",
            "Indirect",
            "Paraphrased",
            "Unattributed"
          ],
          "answer": "Direct"
        },
        {
          "question": "In academic writing, which of the following helps in avoiding ambiguity?",
          "options": [
            "Using complex sentences",
            "Using clear and precise terms",
            "Using colloquial expressions",
            "Using vague language"
          ],
          "answer": "Using clear and precise terms"
        },
        {
          "question": "In academic writing, __________ voice is often used to focus on the action rather than the subject performing it.",
          "options": [
            "Active",
            "Passive",
            "Imperative",
            "Conditional"
          ],
          "answer": "Passive"
        },
        {
          "question": "Which of the following is a major element of academic writing?",
          "options": [
            "Informal tone",
            "Subjective expression",
            "Use of clear thesis and arguments",
            "Personal pronouns"
          ],
          "answer": "Use of clear thesis and arguments"
        }
      ]
    },
    {
      "title": "q9",
      "questions": [
        {
          "question": "The report __________ by the team last week.",
          "options": [
            "was submitted",
            "is submitted",
            "will be submitted",
            "has been submitted"
          ],
          "answer": "was submitted"
        },
        {
          "question": "Which of the following sentences is in passive voice?",
          "options": [
            "The teacher explains the lesson.",
            "The students completed the assignment.",
            "The meeting was attended by the manager.",
            "The committee will review the proposal."
          ],
          "answer": "The meeting was attended by the manager."
        },
        {
          "question": "The application form __________ by all participants before the event.",
          "options": [
            "is filled",
            "will be filled",
            "was filled",
            "has been filled"
          ],
          "answer": "will be filled"
        },
        {
          "question": "Which of the following sentences is correct?",
          "options": [
            "The documents were completed by the team.",
            "The team completes the documents.",
            "The documents will complete by the team.",
            "The team completed the documents."
          ],
          "answer": "The documents were completed by the team."
        },
        {
          "question": "The email __________ yesterday afternoon.",
          "options": [
            "is sent",
            "has been sent",
            "was sent",
            "will be sent"
          ],
          "answer": "was sent"
        },
        {
          "question": "Which of the following is the passive form of the sentence \"They are cleaning the room\"?",
          "options": [
            "The room was cleaned by them.",
            "The room is cleaned by them.",
            "The room is being cleaned by them.",
            "The room will be cleaned by them."
          ],
          "answer": "The room is being cleaned by them."
        },
        {
          "question": "The results __________ next week.",
          "options": [
            "will announce",
            "will be announced",
            "is announced",
            "has been announced"
          ],
          "answer": "will be announced"
        },
        {
          "question": "What is the correct passive form of the sentence \"They will launch the new product tomorrow\"?",
          "options": [
            "The new product is launched tomorrow.",
            "The new product will be launched tomorrow.",
            "The new product will launch tomorrow.",
            "The new product is being launched tomorrow."
          ],
          "answer": "The new product will be launched tomorrow."
        },
        {
          "question": "The decision __________ after the final meeting.",
          "options": [
            "is made",
            "was made",
            "has been made",
            "will be made"
          ],
          "answer": "was made"
        },
        {
          "question": "Which sentence is in the passive voice?",
          "options": [
            "The committee approved the proposal.",
            "The proposal was approved by the committee.",
            "The committee is approving the proposal.",
            "The committee will approve the proposal."
          ],
          "answer": "The proposal was approved by the committee."
        },
        {
          "question": "The report __________ by the assistant manager.",
          "options": [
            "is prepared",
            "was prepared",
            "has been prepared",
            "will be prepared"
          ],
          "answer": "was prepared"
        },
        {
          "question": "Identify the correct passive form of \"The teacher gave the students the homework\".",
          "options": [
            "The homework was given by the students.",
            "The students were given the homework by the teacher.",
            "The teacher was given the homework.",
            "The homework was given to the teacher."
          ],
          "answer": "The students were given the homework by the teacher."
        },
        {
          "question": "The research __________ over a period of six months.",
          "options": [
            "is conducted",
            "was conducted",
            "has been conducted",
            "will be conducted"
          ],
          "answer": "was conducted"
        },
        {
          "question": "Which of the following sentences is in passive voice?",
          "options": [
            "The manager reviews the report.",
            "The report is reviewed by the manager.",
            "The manager will review the report.",
            "The report will review the manager."
          ],
          "answer": "The report is reviewed by the manager."
        },
        {
          "question": "The contract __________ by both parties tomorrow.",
          "options": [
            "will sign",
            "will be signed",
            "is signed",
            "has been signed"
          ],
          "answer": "will be signed"
        },
        {
          "question": "What is the correct passive form of \"They are completing the project\"?",
          "options": [
            "The project is completed.",
            "The project is being completed.",
            "The project was completed.",
            "The project has been completed."
          ],
          "answer": "The project is being completed."
        },
        {
          "question": "The document __________ by the administration office last Friday.",
          "options": [
            "is sent",
            "was sent",
            "has been sent",
            "will be sent"
          ],
          "answer": "was sent"
        },
        {
          "question": "Which of the following is the passive form of \"The workers are building a new bridge\"?",
          "options": [
            "A new bridge is being built by the workers.",
            "A new bridge has been built by the workers.",
            "A new bridge was built by the workers.",
            "The workers are building a new bridge."
          ],
          "answer": "A new bridge is being built by the workers."
        },
        {
          "question": "The documents __________ by the team before the deadline.",
          "options": [
            "completed",
            "was completed",
            "were completed",
            "will complete"
          ],
          "answer": "were completed"
        },
        {
          "question": "Which of the following sentences is in the correct passive voice?",
          "options": [
            "The test results were analyzed by the researchers.",
            "The researchers analyzed the test results.",
            "The researchers will analyze the test results.",
            "The test results will analyze the researchers."
          ],
          "answer": "The test results were analyzed by the researchers."
        }
      ]
    },
    {
      "title": "q10",
      "questions": [
        {
          "question": "To maintain __________ in academic writing, it is important to connect ideas logically between paragraphs.",
          "options": [
            "Coherence",
            "Incoherence",
            "Uncertainty",
            "Disagreement"
          ],
          "answer": "Coherence"
        },
        {
          "question": "Which word is the most formal alternative for \"a lot\"?",
          "options": [
            "Much",
            "Many",
            "Numerous",
            "Few"
          ],
          "answer": "Numerous"
        },
        {
          "question": "The researcher is conducting __________ to understand the behavior of the species in the wild.",
          "options": [
            "Research",
            "Investigation",
            "Survey",
            "Analysis"
          ],
          "answer": "Research"
        },
        {
          "question": "Which of the following words can replace \"big\" in academic writing?",
          "options": [
            "Huge",
            "Substantial",
            "Large",
            "Fat"
          ],
          "answer": "Substantial"
        },
        {
          "question": "The study provides __________ that supports the hypothesis.",
          "options": [
            "Evidence",
            "Speculation",
            "Assumptions",
            "Theories"
          ],
          "answer": "Evidence"
        },
        {
          "question": "Which word is the most formal alternative for \"help\"?",
          "options": [
            "Assist",
            "Aid",
            "Support",
            "Rescue"
          ],
          "answer": "Assist"
        },
        {
          "question": "It is important to __________ all possible variables when conducting the experiment.",
          "options": [
            "Consider",
            "Disregard",
            "Ignore",
            "Exclude"
          ],
          "answer": "Consider"
        },
        {
          "question": "Which of the following words can replace \"show\" in academic writing?",
          "options": [
            "Display",
            "Present",
            "Demonstrate",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "The data __________ the assumptions made at the beginning of the study.",
          "options": [
            "Confirm",
            "Deny",
            "Ignore",
            "Indicate"
          ],
          "answer": "Confirm"
        },
        {
          "question": "Which of the following is the best academic replacement for \"get\"?",
          "options": [
            "Receive",
            "Obtain",
            "Acquire",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "The __________ in global temperatures is a matter of concern.",
          "options": [
            "Increase",
            "Decrease",
            "Growth",
            "Expansion"
          ],
          "answer": "Increase"
        },
        {
          "question": "Which word can be substituted for \"thing\" in academic writing?",
          "options": [
            "Object",
            "Item",
            "Entity",
            "Phenomenon"
          ],
          "answer": "Entity"
        },
        {
          "question": "The committee decided to __________ the deadline for the final submission.",
          "options": [
            "Extend",
            "Reduce",
            "Shorten",
            "Eliminate"
          ],
          "answer": "Extend"
        },
        {
          "question": "Which of the following is the most formal substitute for \"important\"?",
          "options": [
            "Critical",
            "Valuable",
            "Significant",
            "Essential"
          ],
          "answer": "Significant"
        },
        {
          "question": "The findings of the research __________ the theory proposed by the scientist.",
          "options": [
            "Support",
            "Reject",
            "Oppose",
            "Deny"
          ],
          "answer": "Support"
        },
        {
          "question": "Which of the following terms is the most formal alternative to \"a lot of\"?",
          "options": [
            "Plenty",
            "Numerous",
            "Several",
            "Many"
          ],
          "answer": "Numerous"
        },
        {
          "question": "The researcher __________ the results carefully to ensure accuracy.",
          "options": [
            "Examine",
            "Ignore",
            "Overlook",
            "Reject"
          ],
          "answer": "Examine"
        },
        {
          "question": "Which word can replace \"about\" in academic writing?",
          "options": [
            "Concerning",
            "Regarding",
            "Pertaining to",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "The __________ of the experiment was documented in detail.",
          "options": [
            "Outcome",
            "Process",
            "Cause",
            "Effect"
          ],
          "answer": "Outcome"
        },
        {
          "question": "Which of the following is the most formal replacement for \"many\"?",
          "options": [
            "Numerous",
            "A lot",
            "Plenty",
            "Some"
          ],
          "answer": "Numerous"
        }
      ]
    },
    {
      "title": "q11",
      "questions": [
        {
          "question": "To ensure __________, the verb must match the subject in number and person.",
          "options": [
            "Subject-verb agreement",
            "Subject-object agreement",
            "Object-verb agreement",
            "Object-subject agreement"
          ],
          "answer": "Subject-verb agreement"
        },
        {
          "question": "Which of the following sentences is grammatically correct?",
          "options": [
            "The data was collected yesterday.",
            "The data were collected yesterday.",
            "The data has been collected yesterday.",
            "The data is being collected yesterday."
          ],
          "answer": "The data were collected yesterday."
        },
        {
          "question": "__________ is a significant difference between the two reports.",
          "options": [
            "There",
            "Their",
            "They",
            "Them"
          ],
          "answer": "There"
        },
        {
          "question": "Which of the following sentences uses the correct form of the verb?",
          "options": [
            "Neither the professor nor the students is ready.",
            "Neither the professor nor the students are ready.",
            "Neither the professor nor the students were ready.",
            "Neither the professor nor the students be ready."
          ],
          "answer": "Neither the professor nor the students are ready."
        },
        {
          "question": "She __________ the book every week.",
          "options": [
            "Read",
            "Reads",
            "Is read",
            "Has read"
          ],
          "answer": "Reads"
        },
        {
          "question": "Which of the following is the correct plural form of \"criterion\"?",
          "options": [
            "Criteria",
            "Criterion",
            "Criterions",
            "Criteri"
          ],
          "answer": "Criteria"
        },
        {
          "question": "He __________ writing his thesis.",
          "options": [
            "Is",
            "Are",
            "Be",
            "Was"
          ],
          "answer": "Is"
        },
        {
          "question": "Which of the following sentences is in the past perfect tense?",
          "options": [
            "I had finished my work before the meeting.",
            "I was finishing my work when the meeting started.",
            "I finish my work every day.",
            "I am finishing my work right now."
          ],
          "answer": "I had finished my work before the meeting."
        },
        {
          "question": "__________ it was raining, we decided to go for a walk.",
          "options": [
            "Although",
            "Because",
            "Since",
            "Therefore"
          ],
          "answer": "Although"
        },
        {
          "question": "Which of the following sentences contains a correct use of the conjunction \"because\"?",
          "options": [
            "Because it was raining, we cancelled the event.",
            "We cancelled the event, because it was raining.",
            "It was raining because we cancelled the event.",
            "We cancelled the event because raining."
          ],
          "answer": "Because it was raining, we cancelled the event."
        },
        {
          "question": "I will __________ a report tomorrow.",
          "options": [
            "Write",
            "Wrote",
            "Written",
            "Writing"
          ],
          "answer": "Write"
        },
        {
          "question": "Which of the following is a correct example of subject-verb agreement?",
          "options": [
            "The information are correct.",
            "The information is correct.",
            "The information were correct.",
            "The information be correct."
          ],
          "answer": "The information is correct."
        },
        {
          "question": "If I __________ you, I would submit the assignment on time.",
          "options": [
            "Be",
            "Were",
            "Am",
            "Is"
          ],
          "answer": "Were"
        },
        {
          "question": "Which sentence uses the correct form of \"its\" or \"it's\"?",
          "options": [
            "Its a wonderful day.",
            "It's a wonderful day.",
            "The dog chased its tail because it's hungry.",
            "It's coat is warm."
          ],
          "answer": "It's a wonderful day."
        },
        {
          "question": "The books __________ on the shelf.",
          "options": [
            "Is",
            "Are",
            "Be",
            "Was"
          ],
          "answer": "Are"
        },
        {
          "question": "Which of the following sentences is grammatically correct?",
          "options": [
            "The report, that was submitted last week, was approved.",
            "The report, which was submitted last week, was approved.",
            "The report which was submitted last week was approved.",
            "The report was approved that was submitted last week."
          ],
          "answer": "The report, which was submitted last week, was approved."
        },
        {
          "question": "The teacher __________ the students to complete the assignment by Friday.",
          "options": [
            "Ask",
            "Asks",
            "Askeds",
            "Asking"
          ],
          "answer": "Asks"
        },
        {
          "question": "Which of the following sentences is an example of an imperative sentence?",
          "options": [
            "You should go home now.",
            "Go home now.",
            "Will you go home now?",
            "Going home now is important."
          ],
          "answer": "Go home now."
        },
        {
          "question": "The team __________ completed the project ahead of schedule.",
          "options": [
            "Has",
            "Have",
            "Was",
            "Is"
          ],
          "answer": "Has"
        },
        {
          "question": "Which of the following sentences contains an error in subject-verb agreement?",
          "options": [
            "The team is ready for the competition.",
            "The teams are ready for the competition.",
            "The students are working hard.",
            "The student are working hard."
          ],
          "answer": "The student are working hard."
        }
      ]
    },
    {
      "title": "q12",
      "questions": [
        {
          "question": "The project __________ by the team yesterday.",
          "options": [
            "Complete",
            "Was completed",
            "Is completed",
            "Has been completed"
          ],
          "answer": "Was completed"
        },
        {
          "question": "Which of the following sentences is in passive voice?",
          "options": [
            "The researchers conducted the experiment.",
            "The experiment was conducted by the researchers.",
            "The researchers are conducting the experiment.",
            "The experiment will conduct the researchers."
          ],
          "answer": "The experiment was conducted by the researchers."
        },
        {
          "question": "The results __________ at the meeting tomorrow.",
          "options": [
            "Are announced",
            "Were announced",
            "Will be announced",
            "Are being announced"
          ],
          "answer": "Will be announced"
        },
        {
          "question": "What is the passive form of the sentence: \"They are fixing the car\"?",
          "options": [
            "The car fixes.",
            "The car is fixed.",
            "The car is being fixed.",
            "The car will be fixed."
          ],
          "answer": "The car is being fixed."
        },
        {
          "question": "The contract __________ by the manager yesterday.",
          "options": [
            "Is signed",
            "Was signed",
            "Will be signed",
            "Has been signed"
          ],
          "answer": "Was signed"
        },
        {
          "question": "Which of the following sentences is in passive voice?",
          "options": [
            "The company developed new software.",
            "The new software was developed by the company.",
            "The company is developing new software.",
            "The new software is being developed by the company."
          ],
          "answer": "The new software was developed by the company."
        },
        {
          "question": "The research paper __________ last week.",
          "options": [
            "Is submitted",
            "Was submitted",
            "Will be submitted",
            "Has been submitted"
          ],
          "answer": "Was submitted"
        },
        {
          "question": "Which of the following is the passive form of \"They will complete the report\"?",
          "options": [
            "The report is completed.",
            "The report will be completed.",
            "The report is being completed.",
            "The report has been completed."
          ],
          "answer": "The report will be completed."
        },
        {
          "question": "The new regulations __________ by the government next month.",
          "options": [
            "Were implemented",
            "Are implemented",
            "Will be implemented",
            "Have been implemented"
          ],
          "answer": "Will be implemented"
        },
        {
          "question": "Which of the following sentences uses the correct passive voice?",
          "options": [
            "The lecture is presented by the professor.",
            "The professor presented the lecture.",
            "The lecture was presented by the professor.",
            "The lecture presented the professor."
          ],
          "answer": "The lecture was presented by the professor."
        },
        {
          "question": "The document __________ by the assistant before the meeting.",
          "options": [
            "Is prepared",
            "Was prepared",
            "Will be prepared",
            "Has been prepared"
          ],
          "answer": "Was prepared"
        },
        {
          "question": "Which of the following sentences is in passive voice?",
          "options": [
            "The researchers collected data from the participants.",
            "Data was collected from the participants by the researchers.",
            "The researchers are collecting data.",
            "The participants collected data."
          ],
          "answer": "Data was collected from the participants by the researchers."
        },
        {
          "question": "The book __________ last year.",
          "options": [
            "Was published",
            "Is published",
            "Will be published",
            "Has been published"
          ],
          "answer": "Was published"
        },
        {
          "question": "Which of the following sentences uses passive voice correctly?",
          "options": [
            "The results of the study will be analyzed by the team.",
            "The team analyzed the results of the study.",
            "The team will analyze the results of the study.",
            "The team is analyzing the results of the study."
          ],
          "answer": "The results of the study will be analyzed by the team."
        },
        {
          "question": "The house __________ last month.",
          "options": [
            "Was sold",
            "Is sold",
            "Has been sold",
            "Will be sold"
          ],
          "answer": "Was sold"
        },
        {
          "question": "What is the correct passive form of \"They are designing a new website\"?",
          "options": [
            "A new website is being designed.",
            "A new website designs.",
            "A new website is designed.",
            "A new website will be designed."
          ],
          "answer": "A new website is being designed."
        },
        {
          "question": "The meeting __________ for next Friday.",
          "options": [
            "Was scheduled",
            "Is scheduled",
            "Will be scheduled",
            "Has been scheduled"
          ],
          "answer": "Is scheduled"
        },
        {
          "question": "Which of the following is a passive sentence?",
          "options": [
            "The company produces high-quality goods.",
            "High-quality goods are produced by the company.",
            "The company will produce high-quality goods.",
            "High-quality goods produce the company."
          ],
          "answer": "High-quality goods are produced by the company."
        },
        {
          "question": "The system __________ by the team every month.",
          "options": [
            "Tests",
            "Is tested",
            "Will be tested",
            "Has been tested"
          ],
          "answer": "Is tested"
        },
        {
          "question": "What is the correct passive form of \"The researchers will analyze the data\"?",
          "options": [
            "The data will be analyzed by the researchers.",
            "The data is analyzed by the researchers.",
            "The data has been analyzed by the researchers.",
            "The data will analyze the researchers."
          ],
          "answer": "The data will be analyzed by the researchers."
        }
      ]
    },
    {
      "title": "q13",
      "questions": [
        {
          "question": "To maintain __________ in academic writing, it is important to avoid personal opinions.",
          "options": [
            "Objectivity",
            "Subjectivity",
            "Bias",
            "Emotions"
          ],
          "answer": "Objectivity"
        },
        {
          "question": "Which of the following is an example of formal language?",
          "options": [
            "Gotta",
            "Wanna",
            "Should not",
            "OK"
          ],
          "answer": "Should not"
        },
        {
          "question": "In academic writing, __________ language should be used to maintain a neutral and objective tone.",
          "options": [
            "Personal",
            "Impersonal",
            "Emotional",
            "Informal"
          ],
          "answer": "Impersonal"
        },
        {
          "question": "Which of the following is an example of an objective statement in academic writing?",
          "options": [
            "I believe the results are promising.",
            "The results indicate a significant improvement.",
            "In my opinion, the results are not accurate.",
            "I think the experiment was successful."
          ],
          "answer": "The results indicate a significant improvement."
        },
        {
          "question": "It is crucial to avoid __________ expressions in academic writing.",
          "options": [
            "Slang",
            "Formal",
            "Technical",
            "Complex"
          ],
          "answer": "Slang"
        },
        {
          "question": "Which sentence is the most formal?",
          "options": [
            "This paper talks about the effects of climate change.",
            "This paper discusses the effects of climate change.",
            "This paper is about the effects of climate change.",
            "This paper mentions the effects of climate change."
          ],
          "answer": "This paper discusses the effects of climate change."
        },
        {
          "question": "In academic writing, one should use __________ language to avoid bias.",
          "options": [
            "Emotional",
            "Neutral",
            "Informal",
            "Strong"
          ],
          "answer": "Neutral"
        },
        {
          "question": "Which of the following sentences is the most objective?",
          "options": [
            "I think the theory is flawed.",
            "The theory seems to have flaws.",
            "The theory is flawed.",
            "The theory is probably flawed."
          ],
          "answer": "The theory seems to have flaws."
        },
        {
          "question": "Using __________ is essential for maintaining objectivity in academic writing.",
          "options": [
            "Personal pronouns",
            "Third-person perspective",
            "First-person perspective",
            "Second-person perspective"
          ],
          "answer": "Third-person perspective"
        },
        {
          "question": "Which of the following phrases is considered informal and should be avoided in academic writing?",
          "options": [
            "For example",
            "As shown in the table",
            "It's clear that",
            "In conclusion"
          ],
          "answer": "It's clear that"
        },
        {
          "question": "The study __________ that further research is needed to confirm the results.",
          "options": [
            "Suggests",
            "Suggested",
            "Is suggesting",
            "Has suggested"
          ],
          "answer": "Suggests"
        },
        {
          "question": "Which of the following is the most formal alternative for \"get\"?",
          "options": [
            "Receive",
            "Obtain",
            "Acquire",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "The __________ of colloquial language is discouraged in formal academic writing.",
          "options": [
            "Use",
            "Using",
            "Used",
            "To use"
          ],
          "answer": "Use"
        },
        {
          "question": "Which sentence is more formal?",
          "options": [
            "I think the data is accurate.",
            "The data appears to be accurate.",
            "I believe the data is accurate.",
            "The data seems to be accurate."
          ],
          "answer": "The data appears to be accurate."
        },
        {
          "question": "In academic writing, it is important to __________ personal opinions in the analysis of data.",
          "options": [
            "Avoid",
            "Include",
            "Emphasize",
            "Consider"
          ],
          "answer": "Avoid"
        },
        {
          "question": "Which of the following is an example of formal academic language?",
          "options": [
            "The paper will look at how climate change impacts the environment.",
            "The paper will examine how climate change impacts the environment.",
            "The paper is going to look at how climate change impacts the environment.",
            "The paper will discuss how climate change affects the environment."
          ],
          "answer": "The paper will examine how climate change impacts the environment."
        },
        {
          "question": "Using __________ helps to ensure precision and clarity in academic writing.",
          "options": [
            "Clichés",
            "Technical terms",
            "Informal expressions",
            "Colloquial language"
          ],
          "answer": "Technical terms"
        },
        {
          "question": "Which sentence maintains the appropriate objectivity for academic writing?",
          "options": [
            "I personally think the data supports the hypothesis.",
            "The data supports the hypothesis.",
            "I believe the data supports the hypothesis.",
            "In my opinion, the data supports the hypothesis."
          ],
          "answer": "The data supports the hypothesis."
        },
        {
          "question": "It is important to use __________ evidence to support your arguments in academic writing.",
          "options": [
            "Direct",
            "Indirect",
            "Personal",
            "Emotional"
          ],
          "answer": "Direct"
        },
        {
          "question": "Which of the following words is most formal and appropriate for academic writing?",
          "options": [
            "A lot",
            "A few",
            "Several",
            "Plenty"
          ],
          "answer": "Several"
        }
      ]
    }
  ]
};



// This function gets the quiz data based on the selected quiz type
async function getQuiz(type) {
    try {
        // Instead of fetching, we use the embedded quizData
        const data = quizData;
        for (const quiz of data.quizzes) {
            if (quiz.title == type) {
                quizChosen = quiz;
                totalQuestions = quizChosen.questions.length;
                document.querySelector(".question-total").textContent = totalQuestions;
                increment = (1 / totalQuestions) * 100;
            }
        }
        makeQuestions(quizChosen);
    } catch (error) {
        console.error("Error loading quiz data:", error);
    }
}

// quiz flow:
// populate fields -> submit event handler validates (wrong - show wrong, do nothing. right - show right, move on)

function makeQuestions(quizChoice) {
    qCount++;
    document.querySelector(".question-number").textContent = (qCount + 1);
    document.querySelector(".progress-bar.done").style.width = (increment * (qCount + 1)).toString() + "%";
    submit.textContent = "Submit"
    let options = document.querySelectorAll(".option");

    document.querySelector(".question").textContent = quizChoice.questions[qCount].question;

    for (let option of options) {
        option.classList.remove("selected")
        option.classList.remove("invalid")
        option.classList.remove("correct")
    }

    for (let i = 0; i < options.length; i++) {
        switch (i) {
            case 0: options[i].innerHTML = "<div class='option-box'>A</div>"
                break;
            case 1: options[i].innerHTML = "<div class='option-box'>B</div>"
                break;
            case 2: options[i].innerHTML = "<div class='option-box'>C</div>"
                break;
            case 3: options[i].innerHTML = "<div class='option-box'>D</div>"
                break;
        }
        options[i].append(quizChoice.questions[qCount].options[i])
    }
}

var options = document.querySelectorAll(".option");

for (let i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function () {
        for (option of options) {
            option.classList.remove("selected")
            option.firstChild.classList.remove("selected-box")
        }
        options[i].classList.add("selected")
        options[i].firstChild.classList.add("selected-box")
    })
}

submit.addEventListener("click", function () {
    let selectedBox, answerText;

    if (submit.textContent == "Next Question") {
        makeQuestions(quizChosen);
        return;
    }
    if (submit.textContent == "See Results") {
        showQuizComplete();
        return;
    }
    if (selectedBox = document.querySelector(".selected")) {

        // remove selection letter from string
        answerText = selectedBox.textContent.slice(1, selectedBox.textContent.length);

        // once submit is pressed, is a selected box exists, remove it's selected classes
        selectedBox.classList.remove("selected")
        selectedBox.firstChild.classList.remove("selected-box")
    }
    else {
        document.querySelector(".select-prompt").style.visibility = "visible"
        return
    }

    if (validate(answerText)) {
        // instead of makeQuestions, change styling to green look, and submit button to next question text
        if (!selectedBox.classList.contains("correct")) {
            score++;
            selectedBox.innerHTML += "<img class='correct-icon' src='./assets/images/icon-correct.svg'>"
        }
        selectedBox.classList.add("correct")
        selectedBox.firstChild.classList.add("correct-box")
        document.querySelector(".select-prompt").style.visibility = "hidden"
    }
    else {
        // apply some invalid css styles to boxes
        if (!selectedBox.classList.contains("invalid")) {
            selectedBox.innerHTML += "<img class='invalid-icon' src='./assets/images/icon-incorrect.svg'>"
        }

        selectedBox.classList.add("invalid")
        selectedBox.firstChild.classList.add("invalid-box")
        document.querySelector(".select-prompt").style.visibility = "hidden"
    }

    revealAnswers();

    if (qCount >= (totalQuestions - 1)) {
        submit.textContent = "See Results"

    }
    else {
        submit.textContent = "Next Question";
    }
    return;
})

function revealAnswers() {
    for (option of options) {
        let text = option.textContent.slice(1, option.textContent.length)

        if (validate(text)) {
            if (!option.classList.contains("correct")) {
                option.classList.add("correct")
                option.firstChild.classList.add("correct-box")
                option.innerHTML += "<img class='correct-icon' src='./assets/images/icon-correct.svg'>"

            }
        }
        else {
            if (!option.classList.contains("invalid")) {
                option.classList.add("invalid")
                option.firstChild.classList.add("invalid-box")
                option.innerHTML += "<img class='invalid-icon' src='./assets/images/icon-incorrect.svg'>"
            }
        }
    }
}

function validate(selected) {
    let question = quizChosen.questions[qCount];
    return (question.answer === selected)
}

function showQuizComplete() {
    document.querySelector(".question-screen").classList.toggle("visible")
    document.querySelector(".quiz-complete").classList.toggle("visible")
    document.querySelector(".final-score").textContent = score
    document.querySelector(".complete-question-total").textContent = totalQuestions
}

document.querySelector(".restart").addEventListener("click", function () {
    document.querySelector(".quiz-complete").classList.toggle("visible")
    document.querySelector(".start-menu").classList.toggle("visible")
    document.querySelector(".curr-subject").style.visibility = "hidden"
    qCount = -1
    score = 0
})