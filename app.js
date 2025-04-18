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
const quizData = {
  "quizzes": [
    {
        "title": "Sets",  
        "questions": [
          {
        "title": "Counting II",
        "questions": [
          {
            "question": "(1) What is a combination?",
            "options": [
              "An ordered arrangement of objects",
              "An unordered selection of objects",
              "A selection where repetition is allowed",
              "A selection where order matters"
            ],
            "answer": "An unordered selection of objects"
          },
          {
            "question": "(2) How many ways can you choose 3 objects from a set of 10 distinct objects without repetition?",
            "options": [
              "10!/(3!(10-3)!)",
              "10!/7!",
              "10 × 9 × 8",
              "10 × 9 × 8 × 7"
            ],
            "answer": "10!/(3!(10-3)!)"
          },
          {
            "question": "(3) What is the formula for combinations without repetition?",
            "options": [
              "C(n, r) = n!/(r!(n - r)!)",
              "C(n, r) = nʳ/r!",
              "C(n, r) = nʳ/(n - r)!",
              "C(n, r) = n!"
            ],
            "answer": "C(n, r) = n!/(r!(n - r)!)"
          },
          {
            "question": "(4) How many ways can you select 4 pieces of fruit from a bowl of apples, oranges, and pears if repetition is allowed?",
            "options": [
              "(6+4-1)C4",
              "(6-1)C4",
              "3⁴",
              "(4+3-1)C4"
            ],
            "answer": "(6+4-1)C4"
          },
          {
            "question": "(5) What does the binomial coefficient (n r) represent?",
            "options": [
              "The number of ordered selections of r items from n items",
              "The number of unordered selections of r items from n items",
              "The sum of all selections from n items",
              "The difference between n and r"
            ],
            "answer": "The number of unordered selections of r items from n items"
          },
          {
            "question": "(6) In the expansion of (x + y)ⁿ, what do the binomial coefficients represent?",
            "options": [
              "The powers of x and y",
              "The number of terms in the expansion",
              "The coefficients of the terms in the expansion",
              "The sum of all terms"
            ],
            "answer": "The coefficients of the terms in the expansion"
          },
          {
            "question": "(7) Which of the following is the binomial expansion of (x + y)³?",
            "options": [
              "x³ + 3x²y + 3xy² + y³",
              "x³ + 3xy + y³",
              "x³ + y³",
              "x³ + 2xy² + y³"
            ],
            "answer": "x³ + 3x²y + 3xy² + y³"
          },
          {
            "question": "(8) What is Pascal's Identity?",
            "options": [
              "(n r) = (n-1 r-1) + (n-1 r)",
              "(n r) = (n+1 r) + (n r-1)",
              "(n r) = (r n)",
              "(n r) = (r+1 n)"
            ],
            "answer": "(n r) = (n-1 r-1) + (n-1 r)"
          },
          {
            "question": "(9) What is the value of (5 3)?",
            "options": [
              "10",
              "5",
              "15",
              "20"
            ],
            "answer": "10"
          },
          {
            "question": "(10) How many distinct arrangements can be made from the word \"COMPUTER\"?",
            "options": [
              "5040",
              "40320",
              "3600",
              "720"
            ],
            "answer": "40320"
          },
          {
            "question": "(11) What does the Binomial Theorem give?",
            "options": [
              "The sum of the coefficients of a binomial expansion",
              "The coefficients of the expansion of binomials raised to a power",
              "The product of binomials",
              "The number of combinations of a set of elements"
            ],
            "answer": "The coefficients of the expansion of binomials raised to a power"
          },
          {
            "question": "(12) In the expansion of (x + y)⁴, the coefficient of x³y is:",
            "options": [
              "1",
              "4",
              "6",
              "3"
            ],
            "answer": "4"
          },
          {
            "question": "(13) How many terms are there in the expansion of (x + y)⁵?",
            "options": [
              "5",
              "6",
              "7",
              "10"
            ],
            "answer": "6"
          },
          {
            "question": "(14) What is the general form of the binomial expansion for (x + y)ⁿ?",
            "options": [
              "(x + y)ⁿ = ∑ₖ₌₀ⁿ (n k)xⁿ⁻ᵏyᵏ",
              "(x + y)ⁿ = ∑ₖ₌₀ⁿ⁻¹ (n k)xⁿ⁻ᵏyᵏ",
              "(x + y)ⁿ = ∑ₖ₌₁ⁿ (n k)xⁿ⁻ᵏyᵏ",
              "(x + y)ⁿ = ∑ₖ₌₀ⁿ (n k)yⁿ⁻ᵏxᵏ"
            ],
            "answer": "(x + y)ⁿ = ∑ₖ₌₀ⁿ (n k)xⁿ⁻ᵏyᵏ"
          },
          {
            "question": "(15) What is the 3rd term in the expansion of (x + y)⁴?",
            "options": [
              "4x³y",
              "6x²y²",
              "4x²y²",
              "6x³y"
            ],
            "answer": "6x²y²"
          },
          {
            "question": "(16) How do you calculate the coefficient of a specific term in a binomial expansion?",
            "options": [
              "By identifying the corresponding binomial coefficient",
              "By multiplying the exponents of x and y",
              "By adding the powers of x and y",
              "By subtracting the exponents of x and y"
            ],
            "answer": "By identifying the corresponding binomial coefficient"
          },
          {
            "question": "(17) What is the formula for combinations with repetition?",
            "options": [
              "(n r) = n!/(r!(n - r)!)",
              "(n+r-1 r) = (n+r-1)!/(r!(n-1)!)",
              "(n r) = (n-r)!/n!",
              "(n r) = r!/n!"
            ],
            "answer": "(n+r-1 r) = (n+r-1)!/(r!(n-1)!)"
          },
          {
            "question": "(18) What is the number of ways to select 3 people from a group of 10, with repetition allowed?",
            "options": [
              "(10 3)",
              "(10+3-1 3)",
              "10!/(3!(10-3)!)",
              "None of the above"
            ],
            "answer": "(10+3-1 3)"
          },
          {
            "question": "(19) What is the coefficient of x²y³ in the expansion of (x + y)⁵?",
            "options": [
              "5",
              "10",
              "20",
              "15"
            ],
            "answer": "10"
          },
          {
            "question": "(20) What is Pascal's Triangle?",
            "options": [
              "A triangular arrangement of binomial coefficients",
              "A square arrangement of numbers",
              "A table for calculating factorials",
              "A method to calculate combinations with repetition"
            ],
            "answer": "A triangular arrangement of binomial coefficients"
          },
          {
            "question": "(21) How is Pascal's Triangle constructed?",
            "options": [
              "By adding the numbers in the previous row to create the next row",
              "By multiplying each number by its row number",
              "By subtracting numbers from the row above",
              "By squaring the numbers from the previous row"
            ],
            "answer": "By adding the numbers in the previous row to create the next row"
          },
          {
            "question": "(22) What is the coefficient of x²y³ in the expansion of (x + y)⁵?",
            "options": [
              "10",
              "5",
              "15",
              "20"
            ],
            "answer": "10"
          },
          {
            "question": "(23) How many terms are in the expansion of (x + y)⁶?",
            "options": [
              "6",
              "7",
              "8",
              "12"
            ],
            "answer": "7"
          },
          {
            "question": "(24) What is the 4th term in the expansion of (x + y)⁶?",
            "options": [
              "15x³y³",
              "20x⁴y²",
              "6x²y⁴",
              "15x³y²"
            ],
            "answer": "15x³y³"
          },
          {
            "question": "(25) What is the row number of Pascal's Triangle containing (8 4)?",
            "options": [
              "Row 7",
              "Row 8",
              "Row 9",
              "Row 10"
            ],
            "answer": "Row 8"
          },
          {
            "question": "(26) Which identity is related to Pascal's Triangle?",
            "options": [
              "(n r) = (n-1 r-1) + (n-1 r)",
              "(n r) = (n+r-1 r)",
              "(n r) = n!/r!",
              "None of the above"
            ],
            "answer": "(n r) = (n-1 r-1) + (n-1 r)"
          },
          {
            "question": "(27) What is the sum of all elements in row 3 of Pascal's Triangle?",
            "options": [
              "6",
              "8",
              "16",
              "12"
            ],
            "answer": "8"
          },
          {
            "question": "(28) How many ways can you select 4 objects from a set of 10 objects, with repetition allowed?",
            "options": [
              "(10+4-1 4)",
              "(10 4)",
              "10⁴",
              "10!/(4!(10-4)!)"
            ],
            "answer": "(10+4-1 4)"
          },
          {
            "question": "(29) In the expansion of (2x + 3y)⁴, what is the coefficient of x²y²?",
            "options": [
              "54",
              "108",
              "81",
              "36"
            ],
            "answer": "108"
          },
          {
            "question": "(30) What is the expansion of (x + y)²?",
            "options": [
              "x² + 2xy + y²",
              "x² + y²",
              "2x + 2y",
              "2xy + y²"
            ],
            "answer": "x² + 2xy + y²"
          },
          {
            "question": "(31) What is the sum of the coefficients in the expansion of (x + y)ⁿ?",
            "options": [
              "0",
              "1",
              "n",
              "2ⁿ"
            ],
            "answer": "2ⁿ"
          },
          {
            "question": "(32) In the expansion of (x + y)⁵, what is the coefficient of x²y³?",
            "options": [
              "10",
              "20",
              "30",
              "15"
            ],
            "answer": "10"
          },
          {
            "question": "(33) How is (n r) read?",
            "options": [
              "\"n choose r\"",
              "\"r choose n\"",
              "\"n combinations r\"",
              "\"r combinations n\""
            ],
            "answer": "\"n choose r\""
          },
          {
            "question": "(34) What is the coefficient of x³ in the expansion of (2x + 3)⁵?",
            "options": [
              "81",
              "243",
              "2430",
              "729"
            ],
            "answer": "81"
          },
          {
            "question": "(35) How many ways can you choose 2 toppings from 5 different toppings for a pizza (no repetition)?",
            "options": [
              "5",
              "10",
              "15",
              "20"
            ],
            "answer": "10"
          },
          {
            "question": "(36) What is the number of combinations of 3 objects selected from 7 distinct objects?",
            "options": [
              "35",
              "20",
              "21",
              "15"
            ],
            "answer": "35"
          },
          {
            "question": "(37) What is the general form for the number of ways to choose r objects from n objects with repetition allowed?",
            "options": [
              "(n+r-1 r)",
              "(n r)",
              "nʳ",
              "n!/(r!(n-r)!)"
            ],
            "answer": "(n+r-1 r)"
          },
          {
            "question": "(38) What is the sum of the first 10 terms of the arithmetic sequence 3, 6, 9, 12, ...?",
            "options": [
              "120",
              "135",
              "150",
              "145"
            ],
            "answer": "165"
          },
          {
            "question": "(39) How many ways can you choose 4 objects from 8 objects, if repetition is allowed?",
            "options": [
              "(8+4-1 4)",
              "(8 4)",
              "8⁴",
              "8!/4!"
            ],
            "answer": "(8+4-1 4)"
          },
          {
            "question": "(40) What is the coefficient of x² in (2x + 1)⁴?",
            "options": [
              "6",
              "8",
              "16",
              "12"
            ],
            "answer": "24"
          }
        ]
      },
        "title": "Counting I",
        "questions": [
          {
            "question": "(1) What is the sum rule in counting?",
            "options": [
              "If a task can be done in n₁ ways or in n₂ ways, the total number of ways is n₁ + n₂.",
              "If a task can be done in n₁ ways and n₂ ways, the total number of ways is n₁ × n₂.",
              "If a task can be done in n₁ ways, and there are no restrictions, the total number of ways is n₁.",
              "None of the above."
            ],
            "answer": "If a task can be done in n₁ ways or in n₂ ways, the total number of ways is n₁ + n₂."
          },
          {
            "question": "(2) The product rule states that if a procedure consists of two tasks, where the first task can be completed in n₁ ways and the second task can be completed in n₂ ways, the total number of ways to complete the procedure is:",
            "options": [
              "n₁ + n₂",
              "n₁ × n₂",
              "n₁ - n₂",
              "None of the above"
            ],
            "answer": "n₁ × n₂"
          },
          {
            "question": "(3) What is the number of possible outcomes when rolling a die and flipping a coin at the same time?",
            "options": [
              "2",
              "6",
              "12",
              "8"
            ],
            "answer": "12"
          },
          {
            "question": "(4) How many ways can you select a first-prize winner, a second-prize winner, and a third-prize winner from 100 different people?",
            "options": [
              "100!",
              "100 × 99 × 98",
              "100³",
              "None of the above"
            ],
            "answer": "100 × 99 × 98"
          },
          {
            "question": "(5) The subtraction rule in counting is used when:",
            "options": [
              "The tasks are mutually exclusive.",
              "Tasks overlap and we need to subtract the common outcomes.",
              "Tasks are independent.",
              "None of the above."
            ],
            "answer": "Tasks overlap and we need to subtract the common outcomes."
          },
          {
            "question": "(6) What does the pigeonhole principle state?",
            "options": [
              "If there are k+1 objects placed into k boxes, at least one box must contain more than one object.",
              "If there are fewer boxes than objects, all objects must be in separate boxes.",
              "If there are more boxes than objects, no box will contain more than one object.",
              "None of the above."
            ],
            "answer": "If there are k+1 objects placed into k boxes, at least one box must contain more than one object."
          },
          {
            "question": "(7) How many different bit strings of length 7 are there?",
            "options": [
              "128",
              "256",
              "512",
              "1024"
            ],
            "answer": "128"
          },
          {
            "question": "(8) What is the formula for permutations without repetition?",
            "options": [
              "P(n, r) = n!/(n - r)!",
              "P(n, r) = nʳ",
              "P(n, r) = n!/r!(n - r)!",
              "P(n, r) = n!"
            ],
            "answer": "P(n, r) = n!/(n - r)!"
          },
          {
            "question": "(9) How many ways can you arrange 3 objects from a set of 5 distinct objects without repetition?",
            "options": [
              "15",
              "60",
              "120",
              "10"
            ],
            "answer": "60"
          },
          {
            "question": "(10) How many distinct permutations can be made with the word \"MISSISSIPPI\"?",
            "options": [
              "34650",
              "5040",
              "360",
              "2520"
            ],
            "answer": "34650"
          },
          {
            "question": "(11) If a task can be completed in n ways and there are d identical groups, what is the total number of distinct outcomes?",
            "options": [
              "n/d",
              "n!/d!",
              "n!/d",
              "n × d"
            ],
            "answer": "n/d"
          },
          {
            "question": "(12) If you have 3 letters (A, B, C), how many ways can you arrange 2 letters with repetition?",
            "options": [
              "6",
              "9",
              "12",
              "15"
            ],
            "answer": "9"
          },
          {
            "question": "(13) How many ways can you arrange 4 objects with repetition from a set of 5 distinct objects?",
            "options": [
              "5⁴",
              "5!/(5 - 4)!",
              "4!",
              "None of the above"
            ],
            "answer": "5⁴"
          },
          {
            "question": "(14) If you have 3 colors (Red, Green, Blue) and 2 positions to fill, how many ways can you arrange the colors with repetition?",
            "options": [
              "6",
              "9",
              "12",
              "3"
            ],
            "answer": "9"
          },
          {
            "question": "(15) What is the number of ways to assign 12 offices to two employees, where each employee gets one office?",
            "options": [
              "12!",
              "12 × 11",
              "12 × 12",
              "12²"
            ],
            "answer": "12 × 11"
          },
          {
            "question": "(16) How many different license plates can be made if each plate contains a sequence of three uppercase English letters followed by three digits?",
            "options": [
              "26³ × 10³",
              "26³ × 10²",
              "26³ + 10³",
              "26 × 10"
            ],
            "answer": "26³ × 10³"
          },
          {
            "question": "(17) Which of the following is NOT a type of permutation?",
            "options": [
              "Permutations with repetition",
              "Permutations without repetition",
              "Permutations with indistinguishable objects",
              "Permutations with replacement"
            ],
            "answer": "Permutations with replacement"
          },
          {
            "question": "(18) What is the total number of ways to choose 3 winners from 10 participants for 1st, 2nd, and 3rd prize?",
            "options": [
              "100",
              "720",
              "120",
              "30"
            ],
            "answer": "720"
          },
          {
            "question": "(19) What does the term \"factorial\" (n!) represent?",
            "options": [
              "The sum of the first n integers",
              "The product of all integers from 1 to n",
              "The difference between the first and last integers",
              "The product of the first n odd numbers"
            ],
            "answer": "The product of all integers from 1 to n"
          },
          {
            "question": "(20) If you have 4 balls and 3 boxes, how many ways can you distribute the balls into the boxes, assuming no restrictions?",
            "options": [
              "81",
              "24",
              "64",
              "36"
            ],
            "answer": "81"
          },
          {
            "question": "(21) If you have 15 balls and 7 boxes, what does the pigeonhole principle guarantee?",
            "options": [
              "At least one box contains at least 3 balls",
              "Each box will have exactly 2 balls",
              "All balls will be distributed equally",
              "There will be at least one box without any balls"
            ],
            "answer": "At least one box contains at least 3 balls"
          },
          {
            "question": "(22) The number of ways to choose 5 objects from a set of 8 objects (without repetition) is:",
            "options": [
              "8!/5!(8-5)!",
              "8!/3!",
              "8⁵",
              "8!/3!5!"
            ],
            "answer": "8!/5!(8-5)!"
          },
          {
            "question": "(23) What is the probability that two students chosen randomly from a class of 30 will have the same birthday?",
            "options": [
              "1/30",
              "1/365",
              "1/12",
              "1/30²"
            ],
            "answer": "1/365"
          },
          {
            "question": "(24) How many different ways can you arrange the letters in the word \"DISCRETE\"?",
            "options": [
              "8!",
              "8!/2!",
              "8²",
              "8!/2!2!"
            ],
            "answer": "8!/2!"
          },
          {
            "question": "(25) How many different ways can you select and arrange 3 letters from the word \"MATHEMATICS\"?",
            "options": [
              "72",
              "36",
              "180",
              "360"
            ],
            "answer": "180"
          },
          {
            "question": "(26) If P = n!/r!(n-r)!, what does this formula calculate?",
            "options": [
              "The number of combinations",
              "The number of permutations",
              "The number of ways to distribute identical objects",
              "The number of ways to arrange objects with repetition"
            ],
            "answer": "The number of combinations"
          },
          {
            "question": "(27) How many ways can you assign different offices to two employees from a set of 12 offices?",
            "options": [
              "12",
              "144",
              "132",
              "120"
            ],
            "answer": "132"
          },
          {
            "question": "(28) How many ways can you arrange the letters in the word \"MISSISSIPPI\"?",
            "options": [
              "34650",
              "45360",
              "40560",
              "36000"
            ],
            "answer": "34650"
          },
          {
            "question": "(29) What is the number of ways to select a committee of 3 people from a group of 8 people?",
            "options": [
              "56",
              "336",
              "84",
              "70"
            ],
            "answer": "56"
          },
          {
            "question": "(30) If n objects are arranged, what is the total number of distinct arrangements if some objects are indistinguishable?",
            "options": [
              "n!/r!",
              "n!/(n₁! · n₂! ··· nₖ!)",
              "n!",
              "n!/2!"
            ],
            "answer": "n!/(n₁! · n₂! ··· nₖ!)"
          },
          {
            "question": "(31) In the word \"PERSISTENT,\" how many distinct permutations can be made?",
            "options": [
              "362880",
              "90720",
              "18144",
              "9072"
            ],
            "answer": "90720"
          },
          {
            "question": "(32) How many distinct ways can you arrange the letters of the word \"COMPUTER\"?",
            "options": [
              "40320",
              "5040",
              "6720",
              "50400"
            ],
            "answer": "40320"
          },
          {
            "question": "(33) What is the total number of outcomes if you roll a six-sided die and flip a coin at the same time?",
            "options": [
              "12",
              "8",
              "2",
              "36"
            ],
            "answer": "12"
          },
          {
            "question": "(34) What is the sum of the first n terms of an arithmetic sequence?",
            "options": [
              "n(a₁ + aₙ)/2",
              "n²/2",
              "n × aₙ",
              "None of the above"
            ],
            "answer": "n(a₁ + aₙ)/2"
          },
          {
            "question": "(35) How many ways can you assign 12 offices to two employees from a set of 12 offices?",
            "options": [
              "12",
              "132",
              "144",
              "120"
            ],
            "answer": "144"
          },
          {
            "question": "(36) What does the principle of inclusion-exclusion account for?",
            "options": [
              "Overlapping outcomes in multiple sets",
              "Independent outcomes",
              "Unrelated events",
              "Sequential outcomes"
            ],
            "answer": "Overlapping outcomes in multiple sets"
          },
          {
            "question": "(37) How many ways can you arrange 3 identical red balls and 2 identical blue balls in a row?",
            "options": [
              "10",
              "15",
              "20",
              "60"
            ],
            "answer": "10"
          },
          {
            "question": "(38) How many different 3-digit numbers can be formed using the digits 1, 2, 3, 4, 5, with repetition allowed?",
            "options": [
              "125",
              "120",
              "15",
              "10"
            ],
            "answer": "125"
          },
          {
            "question": "(39) If you are given 4 colors and 3 positions to fill, how many different arrangements are possible with repetition?",
            "options": [
              "16",
              "64",
              "81",
              "10"
            ],
            "answer": "64"
          },
          {
            "question": "(40) In a contest with 100 participants, how many ways can the first, second, and third prize be awarded?",
            "options": [
              "100!",
              "100 × 99 × 98",
              "100 × 100 × 100",
              "99!"
            ],
            "answer": "100 × 99 × 98"
          }
        ]
      },
          {
            "question": "(1) What is a sequence?",
            "options": [
              "A collection of unordered elements",
              "An ordered list of distinct elements",
              "An ordered list of elements, where repetition is allowed",
              "A collection of elements with no relationship between them"
            ],
            "answer": "An ordered list of elements, where repetition is allowed"
          },
          {
            "question": "(2) Which of the following is an example of a sequence?",
            "options": [
              "{1, 2, 3, 4}",
              "{a, b, c}",
              "aₙ = 1, 2, 3, 4",
              "{x, y, z}"
            ],
            "answer": "aₙ = 1, 2, 3, 4"
          },
          {
            "question": "(3) What is the general form for an arithmetic sequence?",
            "options": [
              "aₙ = a₁ + (n - 1)d",
              "aₙ = a₁ × rⁿ⁻¹",
              "aₙ = a₁ + r",
              "aₙ = a₁ × (n + 1)"
            ],
            "answer": "aₙ = a₁ + (n - 1)d"
          },
          {
            "question": "(4) Which of the following sequences is an arithmetic sequence?",
            "options": [
              "2, 4, 6, 8, 10",
              "1, 2, 4, 8, 16",
              "3, 6, 9, 15, 20",
              "5, 10, 20, 40"
            ],
            "answer": "2, 4, 6, 8, 10"
          },
          {
            "question": "(5) In the sequence aₙ = 3n, what is the 4th term?",
            "options": [
              "10",
              "12",
              "9",
              "15"
            ],
            "answer": "12"
          },
          {
            "question": "(6) What is the common difference in the arithmetic sequence aₙ = 2, 4, 6, 8, 10?",
            "options": [
              "1",
              "2",
              "3",
              "4"
            ],
            "answer": "2"
          },
          {
            "question": "(7) What is the common ratio in the geometric sequence bₙ = 2, 4, 8, 16?",
            "options": [
              "1",
              "2",
              "3",
              "4"
            ],
            "answer": "2"
          },
          {
            "question": "(8) Which of the following is true for a geometric sequence?",
            "options": [
              "The sequence increases by a constant amount.",
              "The sequence increases by a constant factor.",
              "The sequence has a decreasing common difference.",
              "The sequence has a constant sum."
            ],
            "answer": "The sequence increases by a constant factor."
          },
          {
            "question": "(9) Which of the following sequences is a geometric sequence?",
            "options": [
              "2, 4, 6, 8",
              "1, 2, 3, 4",
              "2, 6, 18, 54",
              "3, 6, 9, 12"
            ],
            "answer": "2, 6, 18, 54"
          },
          {
            "question": "(10) In the sequence bₙ = 3, 6, 12, 24, ..., what is the 5th term?",
            "options": [
              "48",
              "36",
              "72",
              "54"
            ],
            "answer": "48"
          },
          {
            "question": "(11) What is the formula for the nth term of a geometric sequence?",
            "options": [
              "aₙ = a₁ + (n - 1)d",
              "aₙ = a₁ × rⁿ⁻¹",
              "aₙ = a₁ + r",
              "aₙ = a₁ × (n + 1)"
            ],
            "answer": "aₙ = a₁ × rⁿ⁻¹"
          },
          {
            "question": "(12) Which of the following is the sum of the first 5 terms of the arithmetic sequence 3, 6, 9, 12, ...?",
            "options": [
              "30",
              "35",
              "40",
              "45"
            ],
            "answer": "30"
          },
          {
            "question": "(13) What is the sigma notation for the sum of the first n terms of the arithmetic sequence 2, 4, 6, 8, ...?",
            "options": [
              "∑ᵢ₌₁ⁿ 2i",
              "∑ᵢ₌₁ⁿ 2",
              "∑ᵢ₌₁ⁿ i",
              "∑ᵢ₌₁ⁿ 2i + 1"
            ],
            "answer": "∑ᵢ₌₁ⁿ 2i"
          },
          {
            "question": "(14) What is the factorial of 5?",
            "options": [
              "5",
              "25",
              "120",
              "720"
            ],
            "answer": "120"
          },
          {
            "question": "(15) What is the sum of the first 10 terms of the sequence aₙ = 2n?",
            "options": [
              "110",
              "100",
              "120",
              "105"
            ],
            "answer": "110"
          },
          {
            "question": "(16) What does n! (n factorial) represent?",
            "options": [
              "The sum of the first n numbers.",
              "The product of all integers from 1 to n.",
              "The difference of all integers from 1 to n.",
              "The product of all numbers from 1 to n excluding n."
            ],
            "answer": "The product of all integers from 1 to n."
          },
          {
            "question": "(17) If aₙ = 5n, what is the 7th term in the sequence?",
            "options": [
              "35",
              "40",
              "30",
              "45"
            ],
            "answer": "35"
          },
          {
            "question": "(18) What is the 6th term of the geometric sequence 3, 9, 27, 81, ...?",
            "options": [
              "243",
              "720",
              "162",
              "128"
            ],
            "answer": "243"
          },
          {
            "question": "(19) If the common difference of an arithmetic sequence is 5, what is the 10th term if the first term is 2?",
            "options": [
              "52",
              "50",
              "55",
              "48"
            ],
            "answer": "50"
          },
          {
            "question": "(20) Which of the following is the sum of the first n terms of a geometric sequence?",
            "options": [
              "Sₙ = a₁ × rⁿ⁻¹",
              "Sₙ = a₁(rⁿ - 1)/(r - 1)",
              "Sₙ = a₁(1 - rⁿ)/(r - 1)",
              "Sₙ = a₁ × rⁿ"
            ],
            "answer": "Sₙ = a₁(rⁿ - 1)/(r - 1)"
          },
          {
            "question": "(21) If the nth term of an arithmetic sequence is given by aₙ = 3n + 2, what is the 4th term?",
            "options": [
              "14",
              "15",
              "16",
              "12"
            ],
            "answer": "14"
          },
          {
            "question": "(22) Which of the following represents the common ratio in a geometric sequence?",
            "options": [
              "The difference between two consecutive terms.",
              "The sum of two consecutive terms.",
              "The ratio between two consecutive terms.",
              "The square of the first term."
            ],
            "answer": "The ratio between two consecutive terms."
          },
          {
            "question": "(23) What is the 3rd term of the geometric sequence bₙ = 5, 10, 20, 40, ...?",
            "options": [
              "20",
              "25",
              "30",
              "35"
            ],
            "answer": "20"
          },
          {
            "question": "(24) What is the sum of the first 4 terms of the arithmetic sequence 1, 4, 7, 10?",
            "options": [
              "22",
              "24",
              "25",
              "26"
            ],
            "answer": "22"
          },
          {
            "question": "(25) What is the nth term formula for the arithmetic sequence where the first term is 5 and the common difference is 3?",
            "options": [
              "aₙ = 3n + 5",
              "aₙ = 5n + 3",
              "aₙ = 5 + 3n",
              "aₙ = 5 + (n - 1) × 3"
            ],
            "answer": "aₙ = 5 + (n - 1) × 3"
          },
          {
            "question": "(26) What is the general form for the sum of the first n terms of an arithmetic sequence?",
            "options": [
              "Sₙ = n(a₁ + aₙ)/2",
              "Sₙ = a₁ × n/2",
              "Sₙ = aₙ × n",
              "Sₙ = a₁ × n/1"
            ],
            "answer": "Sₙ = n(a₁ + aₙ)/2"
          },
          {
            "question": "(27) What does the factorial n! represent when n = 3?",
            "options": [
              "3",
              "6",
              "12",
              "18"
            ],
            "answer": "6"
          },
          {
            "question": "(28) What is the sum of the first 5 terms of the geometric sequence 3, 6, 12, 24, 48?",
            "options": [
              "93",
              "95",
              "97",
              "100"
            ],
            "answer": "93"
          },
          {
            "question": "(29) In a geometric sequence, if a₁ = 5 and the common ratio is 2, what is the 4th term?",
            "options": [
              "40",
              "35",
              "50",
              "45"
            ],
            "answer": "40"
          },
          {
            "question": "(30) What is the sum of the first 3 terms of the sequence aₙ = 4n?",
            "options": [
              "24",
              "26",
              "27",
              "30"
            ],
            "answer": "24"
          },
          {
            "question": "(31) In the sequence aₙ = 3ⁿ, what is the value of a₄?",
            "options": [
              "81",
              "64",
              "100",
              "120"
            ],
            "answer": "81"
          },
          {
            "question": "(32) If the common difference of an arithmetic sequence is 7 and the first term is 3, what is the 5th term?",
            "options": [
              "34",
              "38",
              "40",
              "41"
            ],
            "answer": "38"
          },
          {
            "question": "(33) What is the sum of the first 4 terms of the sequence 5, 10, 15, 20, ...?",
            "options": [
              "50",
              "60",
              "55",
              "45"
            ],
            "answer": "50"
          },
          {
            "question": "(34) Which of the following sequences is neither arithmetic nor geometric?",
            "options": [
              "3, 6, 9, 12, ...",
              "1, 2, 4, 8, 16, ...",
              "2, 3, 5, 8, 12 ...",
              "2, 4, 8, 16 ..."
            ],
            "answer": "2, 3, 5, 8, 12 ..."
          },
          {
            "question": "(35) Which of the following is a correct statement about a geometric sequence?",
            "options": [
              "The common difference is constant.",
              "The ratio between successive terms is constant.",
              "The sequence follows an additive pattern.",
              "The sequence follows an exponential pattern."
            ],
            "answer": "The ratio between successive terms is constant."
          },
          {
            "question": "(36) What is the formula for the nth term of an arithmetic sequence where a₁ = 2 and d = 4?",
            "options": [
              "aₙ = 2 + (n - 1) × 4",
              "aₙ = 2 × n + 4",
              "aₙ = 4n + 2",
              "aₙ = 2n + 4"
            ],
            "answer": "aₙ = 2 + (n - 1) × 4"
          },
          {
            "question": "(37) What is the 7th term in the sequence aₙ = 5n?",
            "options": [
              "30",
              "35",
              "40",
              "45"
            ],
            "answer": "35"
          },
          {
            "question": "(38) If aₙ = 3n + 2, what is the 5th term?",
            "options": [
              "15",
              "17",
              "18",
              "20"
            ],
            "answer": "17"
          },
          {
            "question": "(39) The sum of the first n terms of a geometric series is given by the formula:",
            "options": [
              "Sₙ = a₁(rⁿ - 1)/(r - 1)",
              "Sₙ = a₁(1 - rⁿ)/(r + 1)",
              "Sₙ = a₁ + rⁿ",
              "Sₙ = aₙ + a₁"
            ],
            "answer": "Sₙ = a₁(rⁿ - 1)/(r - 1)"
          },
          {
            "question": "(40) What is the sum of the first 5 terms of the sequence aₙ = 2ⁿ?",
            "options": [
              "30",
              "31",
              "32",
              "35"
            ],
            "answer": "31"
          }
        ]
      },
            "question": "(1) What does x ∈ A represent?",
            "options": [
              "x is not an element of A",
              "x is an element of A",
              "x is a subset of A",
              "None of the above"
            ],
            "answer": "x is an element of A"
          },
          {
            "question": "(2) What is the cardinality of the set A = {1, 2, 3}?",
            "options": [
              "1",
              "2",
              "3",
              "4"
            ],
            "answer": "3"
          },
          {
            "question": "(3) The power set of a set with 3 elements has how many subsets?",
            "options": [
              "3",
              "4",
              "6",
              "8"
            ],
            "answer": "8"
          },
          {
            "question": "(4) Which of the following is true about the null set?",
            "options": [
              "It has no elements.",
              "It contains one element.",
              "It is always a subset of all sets.",
              "Both a and c."
            ],
            "answer": "Both a and c."
          },
          {
            "question": "(5) Which of the following represents the set of all real numbers less than 5?",
            "options": [
              "{ x | x < 5 }",
              "{ x | x > 5 }",
              "{ x | x ≤ 5 }",
              "{ x | x ≥ 5 }"
            ],
            "answer": "{ x | x < 5 }"
          },
          {
            "question": "(6) What does the union of two sets A and B represent?",
            "options": [
              "All elements of A that are not in B.",
              "All elements in A and B together.",
              "All elements common to both A and B.",
              "None of the above."
            ],
            "answer": "All elements in A and B together."
          },
          {
            "question": "(7) The symbol A ⊆ B means:",
            "options": [
              "A is a subset of B.",
              "A is not a subset of B.",
              "A and B are equal sets.",
              "A contains only one element from B."
            ],
            "answer": "A is a subset of B."
          },
          {
            "question": "(8) If A = {1, 2, 3} and B = {2, 3, 4}, what is A ∩ B?",
            "options": [
              "{1, 2, 3}",
              "{2, 3}",
              "{1, 4}",
              "{1, 2, 3, 4}"
            ],
            "answer": "{2, 3}"
          },
          {
            "question": "(9) Which of the following is a correct representation of the complement of set A?",
            "options": [
              "A^c",
              "A'",
              "¬A",
              "All of the above"
            ],
            "answer": "All of the above"
          },
          {
            "question": "(10) Which operation does the symbol ∪ represent in set theory?",
            "options": [
              "Union",
              "Intersection",
              "Difference",
              "Complement"
            ],
            "answer": "Union"
          },
          {
            "question": "(11) What does A - B represent?",
            "options": [
              "Elements in A and B",
              "Elements in A but not in B",
              "Elements in both A and B",
              "All elements of the universal set"
            ],
            "answer": "Elements in A but not in B"
          },
          {
            "question": "(12) Two sets are said to be disjoint if:",
            "options": [
              "They have some elements in common.",
              "They have no elements in common.",
              "One set is a subset of the other.",
              "They are identical."
            ],
            "answer": "They have no elements in common."
          },
          {
            "question": "(13) The Cartesian product of two sets A and B results in:",
            "options": [
              "A set of all pairs (a, b) where a ∈ A and b ∈ B.",
              "A set of all common elements between A and B.",
              "A set of all elements of A and B.",
              "None of the above."
            ],
            "answer": "A set of all pairs (a, b) where a ∈ A and b ∈ B."
          },
          {
            "question": "(14) The number of elements in the power set of a set with n elements is:",
            "options": [
              "n",
              "2^n",
              "n^2",
              "n!"
            ],
            "answer": "2^n"
          },
          {
            "question": "(15) If A = {a, b, c}, the power set P(A) will have how many elements?",
            "options": [
              "3",
              "6",
              "8",
              "9"
            ],
            "answer": "8"
          },
          {
            "question": "(16) What is the set {1, 2, 3} ∪ {2, 3, 4}?",
            "options": [
              "{1, 2, 3}",
              "{1, 2, 3, 4}",
              "{2, 3}",
              "{1, 4}"
            ],
            "answer": "{1, 2, 3, 4}"
          },
          {
            "question": "(17) What does x ∉ A mean?",
            "options": [
              "x is not a subset of A.",
              "x is a member of A.",
              "x is not a member of A.",
              "None of the above."
            ],
            "answer": "x is not a member of A"
          },
          {
            "question": "(18) If A = {1, 2, 3} and B = {2, 3, 4}, what is A ∪ B?",
            "options": [
              "{1, 2, 3}",
              "{1, 2, 3, 4}",
              "{1, 4}",
              "{2, 3}"
            ],
            "answer": "{1, 2, 3, 4}"
          },
          {
            "question": "(19) Which of the following sets represents a proper subset of A = {1, 2, 3}?",
            "options": [
              "{1, 2, 3}",
              "{1, 2}",
              "{2, 3, 4}",
              "{4, 5}"
            ],
            "answer": "{1, 2}"
          },
          {
            "question": "(20) What does the symbol ∅ represent?",
            "options": [
              "The universal set",
              "The set of all integers",
              "The null or empty set",
              "The set of real numbers"
            ],
            "answer": "The null or empty set"
          }
        ]
      },
  
      {
        "title": "Sets - Part 2",
        "questions": [
          {
            "question": "(21) If A = {1, 2} and B = {1, 2, 3}, which of the following is true?",
            "options": [
              "A ⊆ B",
              "B ⊆ A",
              "A = B",
              "None of the above"
            ],
            "answer": "A ⊆ B"
          },
          {
            "question": "(22) What is the intersection of the sets A = {1, 2, 3} and B = {3, 4, 5}?",
            "options": [
              "{1, 2}",
              "{3, 4}",
              "{3}",
              "{1, 2, 3, 4, 5}"
            ],
            "answer": "{3}"
          },
          {
            "question": "(23) Which of the following is not a valid set operation?",
            "options": [
              "Union",
              "Intersection",
              "Exponentiation",
              "Complement"
            ],
            "answer": "Exponentiation"
          },
          {
            "question": "(24) What is the power set of A = {1, 2}?",
            "options": [
              "{∅, {1}, {2}, {1, 2}}",
              "{{1, 2}}",
              "{{1}, {2}}",
              "{∅, {1}, {2}}"
            ],
            "answer": "{∅, {1}, {2}, {1, 2}}"
          },
          {
            "question": "(25) If A = {1, 2} and B = {2, 3}, what is A ∪ B?",
            "options": [
              "{1, 2, 3}",
              "{1, 2}",
              "{2, 3}",
              "{1}"
            ],
            "answer": "{1, 2, 3}"
          },
          {
            "question": "(26) What is the result of {1, 2, 3} - {2, 3}?",
            "options": [
              "{1}",
              "{2, 3}",
              "{1, 2}",
              "∅"
            ],
            "answer": "{1}"
          },
          {
            "question": "(27) Which of the following is an example of a Cartesian product?",
            "options": [
              "A × B = {(a, b) | a ∈ A, b ∈ B}",
              "A ∪ B",
              "A ∩ B",
              "A - B"
            ],
            "answer": "A × B = {(a, b) | a ∈ A, b ∈ B}"
          },
          {
            "question": "(28) Which of the following operations corresponds to the logical \"and\" in set theory?",
            "options": [
              "Union",
              "Intersection",
              "Difference",
              "Complement"
            ],
            "answer": "Intersection"
          },
          {
            "question": "(29) If A = {1, 2, 3} and B = {2, 3, 4}, what is A ∪ B?",
            "options": [
              "{1, 2, 3}",
              "{2, 3, 4}",
              "{1, 2, 3, 4}",
              "{1, 3}"
            ],
            "answer": "{1, 2, 3, 4}"
          },
          {
            "question": "(30) What is the complement of A = {1, 2, 3} if the universal set is U = {1, 2, 3, 4, 5}?",
            "options": [
              "{4, 5}",
              "{1, 2, 3}",
              "{2, 3}",
              "{1, 4, 5}"
            ],
            "answer": "{4, 5}"
          },
          {
            "question": "(31) Which of the following is a valid set operation?",
            "options": [
              "Cartesian product",
              "Exponentiation",
              "Division",
              "Square root"
            ],
            "answer": "Cartesian product"
          },
          {
            "question": "(32) If A = {a, b, c} and B = {b, c, d}, what is A - B?",
            "options": [
              "{a, b, c}",
              "{a}",
              "{b, c}",
              "{d}"
            ],
            "answer": "{a}"
          },
          {
            "question": "(33) What does the notation A ⊆ B mean?",
            "options": [
              "A is a proper subset of B.",
              "A is equal to B.",
              "A is a subset of B.",
              "A and B have no elements in common."
            ],
            "answer": "A is a subset of B"
          },
          {
            "question": "(34) Which of the following is not a subset of A = {1, 2, 3}?",
            "options": [
              "{1, 2}",
              "{1, 4}",
              "∅",
              "{2, 3}"
            ],
            "answer": "{1, 4}"
          },
          {
            "question": "(35) The complement of the set A = {1, 2} in the universal set U = {1, 2, 3, 4} is:",
            "options": [
              "{3, 4}",
              "{1, 2}",
              "∅",
              "{1}"
            ],
            "answer": "{3, 4}"
          },
          {
            "question": "(36) The number of subsets of a set with n elements is:",
            "options": [
              "n",
              "2^n",
              "n^2",
              "n!"
            ],
            "answer": "2^n"
          },
          {
            "question": "(37) What is the union of two disjoint sets?",
            "options": [
              "∅",
              "The universal set",
              "Their intersection",
              "A set containing all elements from both sets"
            ],
            "answer": "A set containing all elements from both sets"
          },
          {
            "question": "(38) Which of the following sets is an example of a proper subset of {1, 2, 3}?",
            "options": [
              "{1, 2, 3}",
              "{1, 2}",
              "{2, 3}",
              "Both b and c"
            ],
            "answer": "Both b and c"
          },
          {
            "question": "(39) Which of the following is the result of A ∩ A^c for any set A?",
            "options": [
              "A",
              "∅",
              "A ∪ A^c",
              "U (the universal set)"
            ],
            "answer": "∅"
          },
          {
            "question": "(40) Which of the following sets is equal to the universal set U = {1, 2, 3, 4, 5}?",
            "options": [
              "{1, 2, 3}",
              "{4, 5}",
              "U itself",
              "∅"
            ],
            "answer": "U itself"
          }
        ]
      },
      
      {
        "title": "Functions",
        "questions": [
          {
            "question": "(1) What is a function from set X to set Y?",
            "options": [
              "A relationship where every element of X corresponds to multiple elements of Y.",
              "A relationship where every element of X corresponds to exactly one element of Y.",
              "A relationship where no element of X corresponds to Y.",
              "A relationship where each element of X corresponds to a subset of Y."
            ],
            "answer": "A relationship where every element of X corresponds to exactly one element of Y."
          },
          {
            "question": "(2) If f: X → Y and f(x₁) = f(x₂), what does this imply about x₁ and x₂ in the case of an injective function?",
            "options": [
              "x₁ = x₂",
              "x₁ ≠ x₂",
              "x₁ is a subset of x₂",
              "No relationship between x₁ and x₂"
            ],
            "answer": "x₁ = x₂"
          },
          {
            "question": "(3) Which of the following is true for an onto function?",
            "options": [
              "Every element in the codomain has at least one preimage in the domain.",
              "Every element in the domain is mapped to multiple elements in the codomain.",
              "The function is both injective and surjective.",
              "The function has only one output."
            ],
            "answer": "Every element in the codomain has at least one preimage in the domain."
          },
          {
            "question": "(4) What is the inverse of the function f(x) = 4x + 1?",
            "options": [
              "f⁻¹(x) = (x - 1)/4",
              "f⁻¹(x) = (4x - 1)/3",
              "f⁻¹(x) = (x - 4)/1",
              "f⁻¹(x) = 1/(4x + 1)"
            ],
            "answer": "f⁻¹(x) = (x - 1)/4"
          },
          {
            "question": "(5) What is the definition of a bijection (one-to-one correspondence)?",
            "options": [
              "A function that is both injective and surjective.",
              "A function that is neither injective nor surjective.",
              "A function that is only injective.",
              "A function that is only surjective."
            ],
            "answer": "A function that is both injective and surjective."
          },
          {
            "question": "(6) What is the range of a function?",
            "options": [
              "The set of all possible inputs of the function.",
              "The set of all possible outputs of the function.",
              "The set of all domain elements.",
              "The function's formula."
            ],
            "answer": "The set of all possible outputs of the function."
          },
          {
            "question": "(7) Which of the following is NOT a type of function?",
            "options": [
              "One-to-one (Injective)",
              "Onto (Surjective)",
              "Many-to-one",
              "Multiple-to-many"
            ],
            "answer": "Multiple-to-many"
          },
          {
            "question": "(8) What is the primary difference between an injective and a surjective function?",
            "options": [
              "An injective function maps different elements to different elements, while a surjective function covers the entire codomain.",
              "An injective function is not a surjection, and a surjection is not injective.",
              "An injective function covers the entire codomain, while a surjective function maps to different elements.",
              "There is no difference between injective and surjective functions."
            ],
            "answer": "An injective function maps different elements to different elements, while a surjective function covers the entire codomain."
          },
          {
            "question": "(9) Which of the following statements about the equality of two functions f: A → B and g: A → B is true?",
            "options": [
              "f(x) = g(x) for some x ∈ A.",
              "f(x) = g(x) for all x ∈ A.",
              "f(x) = g(x) for all x ∈ B.",
              "f(x) = g(x) for some x ∈ B."
            ],
            "answer": "f(x) = g(x) for all x ∈ A."
          },
          {
            "question": "(10) If f(x) = 2x + 3, what is the inverse function f⁻¹(x)?",
            "options": [
              "f⁻¹(x) = (x - 3)/2",
              "f⁻¹(x) = (2x - 3)/1",
              "f⁻¹(x) = (x + 3)/2",
              "f⁻¹(x) = 2x + 3"
            ],
            "answer": "f⁻¹(x) = (x - 3)/2"
          },
          {
            "question": "(11) If f(x) = x², what is the range of f(x) for all real numbers?",
            "options": [
              "(-∞, ∞)",
              "[0, ∞)",
              "(-∞, 0]",
              "(-1, 1)"
            ],
            "answer": "[0, ∞)"
          },
          {
            "question": "(12) Which of the following functions is NOT onto (surjective)?",
            "options": [
              "f(x) = x + 1 from ℝ → ℝ",
              "f(x) = x² from ℝ → ℝ",
              "f(x) = 2x from ℝ → ℝ",
              "f(x) = e^x from ℝ → ℝ⁺"
            ],
            "answer": "f(x) = x² from ℝ → ℝ"
          },
          {
            "question": "(13) What is the domain of the function f(x) = 1/(x - 3)?",
            "options": [
              "(-∞, 3) ∪ (3, ∞)",
              "(-∞, ∞)",
              "(-∞, 3] ∪ [3, ∞)",
              "(3, ∞)"
            ],
            "answer": "(-∞, 3) ∪ (3, ∞)"
          },
          {
            "question": "(14) What does the term \"range\" of a function refer to?",
            "options": [
              "The set of all possible inputs",
              "The set of all possible outputs",
              "The set of all elements that are not in the domain",
              "The set of all elements in the codomain"
            ],
            "answer": "The set of all possible outputs"
          },
          {
            "question": "(15) If a function is both injective and surjective, it is called:",
            "options": [
              "An injective function",
              "A surjective function",
              "A bijective function",
              "A one-to-one function"
            ],
            "answer": "A bijective function"
          },
          {
            "question": "(16) Which of the following represents the inverse of the function f(x) = (2x+1)/(x-3)?",
            "options": [
              "f⁻¹(x) = (x-3)/(2x+1)",
              "f⁻¹(x) = (x+3)/(2x-1)",
              "f⁻¹(x) = (x+1)/(2x-3)",
              "f⁻¹(x) = (3x-1)/(2x+1)"
            ],
            "answer": "f⁻¹(x) = (x-3)/(2x+1)"
          },
          {
            "question": "(17) Which of the following is a characteristic of a one-to-one function (injective function)?",
            "options": [
              "Every element in the domain is mapped to one element in the codomain.",
              "Every element in the codomain is the image of at least one element in the domain.",
              "Different elements in the domain map to different elements in the codomain.",
              "The function is both injective and surjective."
            ],
            "answer": "Different elements in the domain map to different elements in the codomain."
          },
          {
            "question": "(18) What is the inverse of the function f(x) = x³?",
            "options": [
              "f⁻¹(x) = x²",
              "f⁻¹(x) = √x",
              "f⁻¹(x) = x^(1/3)",
              "f⁻¹(x) = 3x"
            ],
            "answer": "f⁻¹(x) = x^(1/3)"
          },
          {
            "question": "(19) Which of the following statements is true about a function f and its inverse f⁻¹?",
            "options": [
              "f(f⁻¹(x)) = x",
              "f⁻¹(f(x)) = x",
              "Both a and b",
              "Neither a nor b"
            ],
            "answer": "Both a and b"
          },
          {
            "question": "(20) A function f(x) = x + 3 from ℝ → ℝ is:",
            "options": [
              "Injective but not surjective",
              "Surjective but not injective",
              "Bijective",
              "Neither injective nor surjective"
            ],
            "answer": "Bijective"
          },
          {
            "question": "(21) If f: X → Y is an injective function, which of the following is true?",
            "options": [
              "f(x₁) = f(x₂) implies x₁ = x₂",
              "f(x₁) = f(x₂) implies x₁ ≠ x₂",
              "f(x₁) = f(x₂) for all x₁, x₂ ∈ X",
              "f(x₁) ≠ f(x₂) for any x₁, x₂ ∈ X"
            ],
            "answer": "f(x₁) = f(x₂) implies x₁ = x₂"
          },
          {
            "question": "(22) A function f(x) = x² is:",
            "options": [
              "Injective and surjective",
              "Surjective but not injective",
              "Injective but not surjective",
              "Neither injective nor surjective"
            ],
            "answer": "Neither injective nor surjective"
          },
          {
            "question": "(23) What is the range of the function f(x) = 2x - 3 from ℝ → ℝ?",
            "options": [
              "(-∞, ∞)",
              "[0, ∞)",
              "(-∞, 0]",
              "(0, ∞)"
            ],
            "answer": "(-∞, ∞)"
          },
          {
            "question": "(24) If f(x) = x + 2 and g(x) = 2x + 1, what is the composition f(g(x))?",
            "options": [
              "2x + 3",
              "3x + 3",
              "x + 4",
              "4x + 3"
            ],
            "answer": "2x + 3"
          },
          {
            "question": "(25) Which of the following statements is true about bijective functions?",
            "options": [
              "They are always surjective but not injective.",
              "They are both injective and surjective.",
              "They are always injective but not surjective.",
              "They have no range."
            ],
            "answer": "They are both injective and surjective."
          },
          {
            "question": "(26) What is the domain of the function f(x) = √(x - 2)?",
            "options": [
              "(-∞, 2]",
              "[2, ∞)",
              "(-∞, ∞)",
              "(2, ∞)"
            ],
            "answer": "[2, ∞)"
          },
          {
            "question": "(27) Which of the following functions is not injective (one-to-one)?",
            "options": [
              "f(x) = x² (for real numbers)",
              "f(x) = x + 3",
              "f(x) = 2x - 5",
              "f(x) = 1/x"
            ],
            "answer": "f(x) = x² (for real numbers)"
          },
          {
            "question": "(28) What is the image of f(x) = 3x + 2 for the domain x ∈ ℝ?",
            "options": [
              "(-∞, ∞)",
              "[2, ∞)",
              "(-∞, 2]",
              "(0, ∞)"
            ],
            "answer": "(-∞, ∞)"
          },
          {
            "question": "(29) Which of the following is NOT a property of an inverse function?",
            "options": [
              "f(f⁻¹(x)) = x",
              "f⁻¹(f(x)) = x",
              "f⁻¹(x) = x",
              "Both a and b are properties of an inverse function"
            ],
            "answer": "f⁻¹(x) = x"
          },
          {
            "question": "(30) For a function f: A → B, which of the following is the correct definition of \"onto\"?",
            "options": [
              "Every element of B must have a corresponding element in A.",
              "Every element of A must have a corresponding element in B.",
              "Each element in A maps to only one element in B.",
              "None of the above."
            ],
            "answer": "Every element of B must have a corresponding element in A."
          },
          {
            "question": "(31) If f(x) = 2x + 3, what is the inverse function f⁻¹(x)?",
            "options": [
              "f⁻¹(x) = (x - 3)/2",
              "f⁻¹(x) = 2x + 3",
              "f⁻¹(x) = (2x - 3)/1",
              "f⁻¹(x) = (x + 3)/2"
            ],
            "answer": "f⁻¹(x) = (x - 3)/2"
          },
          {
            "question": "(32) A function f(x) = 2x - 1 from ℝ → ℝ is:",
            "options": [
              "Not injective",
              "Injective but not surjective",
              "Surjective but not injective",
              "Bijective"
            ],
            "answer": "Bijective"
          },
          {
            "question": "(33) If a function is defined as f: A → B and f is injective, what does this imply?",
            "options": [
              "Each element of A corresponds to exactly one element of B.",
              "Every element of B is mapped by at least one element of A.",
              "There are elements in B that are not mapped by any element in A.",
              "None of the above."
            ],
            "answer": "Each element of A corresponds to exactly one element of B."
          },
          {
            "question": "(34) If a function is f(x) = x², for which values of x is the function injective?",
            "options": [
              "x ∈ ℝ",
              "x ≥ 0",
              "x > 0",
              "x ∈ ℤ"
            ],
            "answer": "x ≥ 0"
          },
          {
            "question": "(35) The inverse of the function f(x) = 2x + 1 is:",
            "options": [
              "f⁻¹(x) = (x - 1)/2",
              "f⁻¹(x) = 2x - 1",
              "f⁻¹(x) = (x + 1)/2",
              "f⁻¹(x) = 1/(2x + 1)"
            ],
            "answer": "f⁻¹(x) = (x - 1)/2"
          },
          {
            "question": "(36) Which of the following is an example of a surjective function?",
            "options": [
              "f(x) = x² from ℝ → ℝ⁺",
              "f(x) = x + 1 from ℝ → ℝ",
              "f(x) = x² from ℝ → ℝ",
              "None of the above"
            ],
            "answer": "f(x) = x² from ℝ → ℝ⁺"
          },
          {
            "question": "(37) If f(x) = x² is defined on ℝ, what is the range of the function?",
            "options": [
              "(-∞, ∞)",
              "[0, ∞)",
              "(-∞, 0]",
              "(-1, 1)"
            ],
            "answer": "[0, ∞)"
          },
          {
            "question": "(38) What does a function f need to be in order to be considered bijective?",
            "options": [
              "It must be injective and surjective.",
              "It must be injective only.",
              "It must be surjective only.",
              "None of the above."
            ],
            "answer": "It must be injective and surjective."
          },
          {
            "question": "(39) What is the inverse function of f(x) = (x+3)/(x-4)?",
            "options": [
              "f⁻¹(x) = (x+4)/(x-3)",
              "f⁻¹(x) = (x-4)/(x+3)",
              "f⁻¹(x) = (3x-4)/(x+4)",
              "f⁻¹(x) = (x-3)/(x+4)"
            ],
            "answer": "f⁻¹(x) = (x-4)/(x+3)"
          },
          {
            "question": "(40) What does the composition of two functions f(g(x)) represent?",
            "options": [
              "Applying function g first, then applying function f to the result.",
              "Applying function f first, then applying function g to the result.",
              "The same as multiplying functions.",
              "The same as adding functions."
            ],
            "answer": "Applying function g first, then applying function f to the result."
          }
        ]
      {
        "title": "Graphs and Graph Algorithms",
        "questions": [
          {
            "question": "(1) What is a graph?",
            "options": [
              "A set of vertices with no edges",
              "A set of vertices and a set of edges",
              "A set of edges without vertices",
              "A set of nodes connected by paths"
            ],
            "answer": "A set of vertices and a set of edges"
          },
          {
            "question": "(2) In a directed graph, what is the edge (i, j) different from?",
            "options": [
              "(j, i)",
              "(i, j)",
              "(i, i)",
              "None of the above"
            ],
            "answer": "(j, i)"
          },
          {
            "question": "(3) What is a loop in a graph?",
            "options": [
              "An edge from a vertex to another vertex",
              "An edge from a vertex to itself",
              "An edge connecting two distinct vertices",
              "A cycle in a graph"
            ],
            "answer": "An edge from a vertex to itself"
          },
          {
            "question": "(4) What is a path in a graph?",
            "options": [
              "A sequence of vertices where each vertex is connected to the next one by an edge",
              "A cycle in the graph",
              "A vertex that has no incoming edges",
              "A subgraph containing all vertices"
            ],
            "answer": "A sequence of vertices where each vertex is connected to the next one by an edge"
          },
          {
            "question": "(5) What is the degree of a vertex in an undirected graph?",
            "options": [
              "The number of edges connected to the vertex",
              "The number of paths from the vertex",
              "The number of vertices adjacent to the vertex",
              "The number of cycles involving the vertex"
            ],
            "answer": "The number of edges connected to the vertex"
          },
          {
            "question": "(6) What is the degree of a vertex in a directed graph?",
            "options": [
              "The number of outgoing edges from the vertex",
              "The number of incoming edges to the vertex",
              "The sum of incoming and outgoing edges",
              "All of the above"
            ],
            "answer": "The sum of incoming and outgoing edges"
          },
          {
            "question": "(7) What is a simple path?",
            "options": [
              "A path where vertices can repeat",
              "A path where no vertex is repeated",
              "A cycle where no edges are repeated",
              "A path with a length greater than 3"
            ],
            "answer": "A path where no vertex is repeated"
          },
          {
            "question": "(8) A Hamiltonian cycle is a cycle that:",
            "options": [
              "Contains all the edges of the graph",
              "Contains all the vertices of the graph",
              "Is a simple path",
              "Contains no repeating vertices"
            ],
            "answer": "Contains all the vertices of the graph"
          },
          {
            "question": "(9) What is a spanning tree?",
            "options": [
              "A tree that contains all the edges of the graph",
              "A subgraph of a graph that is a tree and contains all the vertices of the graph",
              "A cycle that contains all the vertices of the graph",
              "A graph with no cycles"
            ],
            "answer": "A subgraph of a graph that is a tree and contains all the vertices of the graph"
          },
          {
            "question": "(10) Which of the following is a representation of a graph?",
            "options": [
              "Adjacency list",
              "Adjacency matrix",
              "Edge list",
              "All of the above"
            ],
            "answer": "All of the above"
          },
          {
            "question": "(11) What is the adjacency matrix of a graph?",
            "options": [
              "A matrix that represents the degree of each vertex",
              "A matrix where the elements represent the presence or absence of an edge between vertices",
              "A matrix that contains the number of paths between vertices",
              "A matrix that stores the distances between vertices"
            ],
            "answer": "A matrix where the elements represent the presence or absence of an edge between vertices"
          },
          {
            "question": "(12) What is the adjacency list representation of a graph?",
            "options": [
              "A list of vertices where each vertex has a list of adjacent vertices",
              "A list of edges where each edge has a list of vertices",
              "A list of vertices sorted by degree",
              "A list of edges that connects all vertices"
            ],
            "answer": "A list of vertices where each vertex has a list of adjacent vertices"
          },
          {
            "question": "(13) Which representation of a graph is generally preferred for sparse graphs?",
            "options": [
              "Adjacency matrix",
              "Edge list",
              "Adjacency list",
              "None of the above"
            ],
            "answer": "Adjacency list"
          },
          {
            "question": "(14) In the BFS (Breadth-First Search) algorithm, what does the queue keep track of?",
            "options": [
              "Vertices that are to be visited",
              "The edges of the graph",
              "The discovered vertices",
              "The visited vertices"
            ],
            "answer": "Vertices that are to be visited"
          },
          {
            "question": "(15) Which of the following is a characteristic of BFS?",
            "options": [
              "BFS uses a stack to explore vertices",
              "BFS explores vertices in a depth-first manner",
              "BFS explores vertices level by level",
              "BFS explores the entire graph in a circular manner"
            ],
            "answer": "BFS explores vertices level by level"
          },
          {
            "question": "(16) In BFS, when visiting a vertex, what do we do?",
            "options": [
              "Push it to the stack",
              "Color it gray and visit its adjacent vertices",
              "Mark it as visited",
              "All of the above"
            ],
            "answer": "Mark it as visited"
          },
          {
            "question": "(17) What is the purpose of BFS in graph traversal?",
            "options": [
              "To find the shortest path between two vertices",
              "To explore the graph in depth",
              "To detect cycles in the graph",
              "To explore a graph without revisiting vertices"
            ],
            "answer": "To find the shortest path between two vertices"
          },
          {
            "question": "(18) Which of the following is true about DFS (Depth-First Search)?",
            "options": [
              "DFS uses a queue to manage the traversal",
              "DFS explores the graph in breadth-first order",
              "DFS explores deeper into the graph before backtracking",
              "DFS explores the graph level by level"
            ],
            "answer": "DFS explores deeper into the graph before backtracking"
          },
          {
            "question": "(19) In DFS, what happens when we reach a vertex with no unvisited adjacent vertices?",
            "options": [
              "We backtrack to the last discovered vertex",
              "We continue exploring the graph",
              "We mark the vertex as visited",
              "We terminate the algorithm"
            ],
            "answer": "We backtrack to the last discovered vertex"
          },
          {
            "question": "(20) What data structure is commonly used in DFS?",
            "options": [
              "Stack",
              "Queue",
              "Array",
              "List"
            ],
            "answer": "Stack"
          },
          {
            "question": "(21) What is the time complexity of BFS on an adjacency list representation?",
            "options": [
              "O(V)",
              "O(E)",
              "O(V + E)",
              "O(V²)"
            ],
            "answer": "O(V + E)"
          },
          {
            "question": "(22) What is the space complexity of BFS using an adjacency list?",
            "options": [
              "O(V)",
              "O(E)",
              "O(V + E)",
              "O(V²)"
            ],
            "answer": "O(V)"
          },
          {
            "question": "(23) What is a directed graph (digraph)?",
            "options": [
              "A graph where edges have no direction",
              "A graph where all edges have a direction",
              "A graph where edges are weighted",
              "A graph with no vertices"
            ],
            "answer": "A graph where all edges have a direction"
          },
          {
            "question": "(24) Which of the following is a characteristic of a weighted graph?",
            "options": [
              "All edges have weights assigned to them",
              "All vertices have weights assigned to them",
              "The graph is always directed",
              "All edges are of equal weight"
            ],
            "answer": "All edges have weights assigned to them"
          },
          {
            "question": "(25) What does the degree of a vertex represent?",
            "options": [
              "The number of edges connected to that vertex",
              "The number of paths leading to that vertex",
              "The total weight of the edges connected to the vertex",
              "The distance between the vertex and the source vertex"
            ],
            "answer": "The number of edges connected to that vertex"
          },
          {
            "question": "(26) Which of the following is true for an undirected graph?",
            "options": [
              "Each edge is represented by an ordered pair",
              "Each edge is represented by an unordered pair",
              "There are no cycles in the graph",
              "The graph has no vertices"
            ],
            "answer": "Each edge is represented by an unordered pair"
          },
          {
            "question": "(27) What is the traversal method used by DFS to explore all vertices?",
            "options": [
              "Level-order traversal",
              "Post-order traversal",
              "Pre-order traversal",
              "In-order traversal"
            ],
            "answer": "Pre-order traversal"
          },
          {
            "question": "(28) In BFS, how do we track the vertices to visit next?",
            "options": [
              "Using a stack",
              "Using a queue",
              "Using an array",
              "Using a linked list"
            ],
            "answer": "Using a queue"
          },
          {
            "question": "(29) What is the main advantage of using BFS over DFS for finding the shortest path in an unweighted graph?",
            "options": [
              "BFS explores deeper",
              "BFS explores level by level, ensuring the shortest path is found first",
              "BFS uses less memory",
              "BFS is faster than DFS"
            ],
            "answer": "BFS explores level by level, ensuring the shortest path is found first"
          },
          {
            "question": "(30) How does DFS handle vertices with no unvisited adjacent vertices?",
            "options": [
              "It backtracks and visits the previous unvisited vertex",
              "It terminates",
              "It explores another random vertex",
              "It revisits the last visited vertex"
            ],
            "answer": "It backtracks and visits the previous unvisited vertex"
          },
          {
            "question": "(31) Which graph traversal algorithm is typically used for cycle detection?",
            "options": [
              "BFS",
              "DFS",
              "Both BFS and DFS",
              "None of the above"
            ],
            "answer": "DFS"
          },
          {
            "question": "(32) What is the main difference between BFS and DFS?",
            "options": [
              "BFS uses a stack while DFS uses a queue",
              "BFS explores vertices level by level, while DFS explores as far as possible down one path",
              "BFS is used for unweighted graphs, while DFS is used for weighted graphs",
              "DFS explores vertices level by level, while BFS explores down one path"
            ],
            "answer": "BFS explores vertices level by level, while DFS explores as far as possible down one path"
          },
          {
            "question": "(33) What is the best use case for using BFS?",
            "options": [
              "Searching for a specific vertex in an unweighted graph",
              "Finding the longest path in a weighted graph",
              "Detecting cycles in a graph",
              "Finding the shortest path in a weighted graph"
            ],
            "answer": "Searching for a specific vertex in an unweighted graph"
          },
          {
            "question": "(34) In the BFS algorithm, how do we keep track of which vertices have been visited?",
            "options": [
              "Using a stack",
              "Using a queue",
              "Using a color coding system (white, gray, black)",
              "Using an array of booleans"
            ],
            "answer": "Using a color coding system (white, gray, black)"
          },
          {
            "question": "(35) What does the adjacency matrix of a graph contain?",
            "options": [
              "The number of paths between each pair of vertices",
              "The number of edges connected to each vertex",
              "A matrix where each entry represents the presence or absence of an edge between two vertices",
              "The weights of the edges"
            ],
            "answer": "A matrix where each entry represents the presence or absence of an edge between two vertices"
          },
          {
            "question": "(36) What is a forest in graph theory?",
            "options": [
              "A tree with multiple roots",
              "A disconnected graph with no cycles",
              "A graph with all cycles removed",
              "A graph with a single root and no cycles"
            ],
            "answer": "A disconnected graph with no cycles"
          },
          {
            "question": "(37) What is a subgraph of a graph?",
            "options": [
              "A graph that contains only a subset of the vertices and edges of the original graph",
              "A graph that contains all the vertices but no edges",
              "A graph that contains only a subset of the edges",
              "A disconnected graph"
            ],
            "answer": "A graph that contains only a subset of the vertices and edges of the original graph"
          },
          {
            "question": "(38) What does the BFS algorithm guarantee when finding paths in a graph?",
            "options": [
              "It finds the shortest path in a weighted graph",
              "It finds the longest path",
              "It finds the shortest path in an unweighted graph",
              "It finds the path with the least number of vertices"
            ],
            "answer": "It finds the shortest path in an unweighted graph"
          },
          {
            "question": "(39) What is the time complexity of BFS in a graph with V vertices and E edges?",
            "options": [
              "O(V + E)",
              "O(V²)",
              "O(E)",
              "O(V)"
            ],
            "answer": "O(V + E)"
          },
          {
            "question": "(40) How can the DFS algorithm be implemented?",
            "options": [
              "Using a stack",
              "Using a queue",
              "Using an array",
              "Using a linked list"
            ],
            "answer": "Using a stack"
          }
        ]
      },
          {
            "question": "(1) What is the first step in mathematical induction?",
            "options": [
              "Base case",
              "Inductive hypothesis",
              "Inductive step",
              "Conclusion"
            ],
            "answer": "Base case"
          },
          {
            "question": "(2) In mathematical induction, the inductive hypothesis assumes that:",
            "options": [
              "The statement is true for all integers",
              "The statement is true for some arbitrary integer k",
              "The statement is true for k+1",
              "The statement is false for k+1"
            ],
            "answer": "The statement is true for some arbitrary integer k"
          },
          {
            "question": "(3) Which of the following is true in the inductive step of a proof by induction?",
            "options": [
              "We show that P(k) implies P(k + 1)",
              "We show that P(k) is true for all integers",
              "We prove P(k) for a specific value of k",
              "We prove the base case"
            ],
            "answer": "We show that P(k) implies P(k + 1)"
          },
          {
            "question": "(4) What does the basis step in mathematical induction prove?",
            "options": [
              "That the statement is true for k+1",
              "That the statement is true for k",
              "That the statement is true for the starting integer, typically n = 1",
              "That the statement is true for all integers"
            ],
            "answer": "That the statement is true for the starting integer, typically n = 1"
          },
          {
            "question": "(5) What does the principle of mathematical induction allow us to prove?",
            "options": [
              "That a statement holds for a finite number of values",
              "That a statement holds for all values greater than or equal to a certain integer",
              "That a statement is false for some values",
              "That a statement is true for all integers"
            ],
            "answer": "That a statement holds for all values greater than or equal to a certain integer"
          },
          {
            "question": "(6) Which of the following is the correct format for a mathematical induction proof?",
            "options": [
              "Prove the base case, then prove the inductive step",
              "Prove the base case only",
              "Prove the inductive hypothesis only",
              "Prove the base case and assumption step"
            ],
            "answer": "Prove the base case, then prove the inductive step"
          },
          {
            "question": "(7) What is the base case for the statement \"For all n ≥ 1, n² ≥ n\"?",
            "options": [
              "P(1): 1² ≥ 1",
              "P(1): 1² ≤ 1",
              "P(2): 2² ≥ 2",
              "P(3): 3² ≥ 3"
            ],
            "answer": "P(1): 1² ≥ 1"
          },
          {
            "question": "(8) What is the inductive hypothesis?",
            "options": [
              "The assumption that the statement is true for k+1",
              "The assumption that the statement is true for an arbitrary k",
              "The assumption that the statement is true for all integers",
              "The assumption that the statement is false for k+1"
            ],
            "answer": "The assumption that the statement is true for an arbitrary k"
          },
          {
            "question": "(9) In the inductive step of mathematical induction, we must prove:",
            "options": [
              "That P(k) holds for k + 1",
              "That P(k + 1) holds if P(k) is true",
              "That P(k) holds for a base case",
              "That P(k + 1) holds for all k"
            ],
            "answer": "That P(k + 1) holds if P(k) is true"
          },
          {
            "question": "(10) What does the principle of mathematical induction help us prove?",
            "options": [
              "That a sequence converges",
              "That a statement is true for every positive integer",
              "That a number is prime",
              "That a formula is incorrect"
            ],
            "answer": "That a statement is true for every positive integer"
          },
          {
            "question": "(11) What is the inductive step in the following proof by induction: Prove that for all n ≥ 1, n³ - n is divisible by 3?",
            "options": [
              "Assume k³ - k is divisible by 3",
              "Assume (k+1)³ - (k+1) is divisible by 3",
              "Prove that k³ - k is divisible by 3",
              "Prove that k³ - k + 3 is divisible by 3"
            ],
            "answer": "Prove that (k+1)³ - (k+1) is divisible by 3"
          },
          {
            "question": "(12) Which of the following inequalities can be proven by mathematical induction?",
            "options": [
              "2ⁿ > n for all n ≥ 5",
              "2ⁿ < n! for all n ≥ 4",
              "n³ - n is divisible by 3 for all n ≥ 1",
              "All of the above"
            ],
            "answer": "All of the above"
          },
          {
            "question": "(13) What is the inductive hypothesis in the following example: Prove that 1 + 2 + 3 + ... + n = n(n+1)/2?",
            "options": [
              "Assume that 1 + 2 + 3 + ... + k = k(k+1)/2",
              "Assume that 1 + 2 + 3 + ... + k = k²/2",
              "Assume that 1 + 2 + 3 + ... + k equals k",
              "Assume that 1 + 2 + 3 + ... + k equals k²"
            ],
            "answer": "Assume that 1 + 2 + 3 + ... + k = k(k+1)/2"
          },
          {
            "question": "(14) What is the base case for the sum of the first n odd integers: 1 + 3 + 5 + ... + (2n-1) = n²?",
            "options": [
              "P(0): 0 = 0²",
              "P(1): 1 = 1²",
              "P(1): 1 + 3 = 4",
              "P(2): 1 + 3 = 9"
            ],
            "answer": "P(1): 1 = 1²"
          },
          {
            "question": "(15) What is the main idea behind mathematical induction?",
            "options": [
              "To show that a formula is valid for an infinite number of cases",
              "To prove the formula holds for all real numbers",
              "To evaluate a formula for a set of numbers",
              "To prove the divisibility of numbers"
            ],
            "answer": "To show that a formula is valid for an infinite number of cases"
          },
          {
            "question": "(16) What is the basis of induction?",
            "options": [
              "The assumption that P(k) is true",
              "The assumption that P(k + 1) is true",
              "Proving that P(1) is true",
              "Proving that P(k + 1) follows from P(k)"
            ],
            "answer": "Proving that P(1) is true"
          },
          {
            "question": "(17) What does P(k) mean in the context of mathematical induction?",
            "options": [
              "The proposition being proven",
              "The conclusion of the inductive hypothesis",
              "The base case",
              "The mathematical proof"
            ],
            "answer": "The proposition being proven"
          },
          {
            "question": "(18) Which of the following can be proven using mathematical induction?",
            "options": [
              "2ⁿ < n! for n ≥ 4",
              "n³ - n is divisible by 3 for every positive integer n",
              "n² ≥ n for all positive integers n",
              "All of the above"
            ],
            "answer": "All of the above"
          },
          {
            "question": "(19) How do we prove that P(k+1) is true in mathematical induction?",
            "options": [
              "By showing that it is false",
              "By assuming that P(k) is true and deriving P(k+1)",
              "By showing that P(k+1) holds for some integer",
              "By using algebraic simplification"
            ],
            "answer": "By assuming that P(k) is true and deriving P(k+1)"
          },
          {
            "question": "(20) What is the next step after completing the inductive hypothesis?",
            "options": [
              "Verify that P(k) is true",
              "Prove that P(k+1) holds",
              "Reapply the base case",
              "End the proof"
            ],
            "answer": "Prove that P(k+1) holds"
          },
          {
            "question": "(21) Which of the following is true for the sum of the first n odd integers?",
            "options": [
              "It always results in a perfect square",
              "It always results in a prime number",
              "It always results in an even number",
              "It always results in a multiple of 3"
            ],
            "answer": "It always results in a perfect square"
          },
          {
            "question": "(22) In the proof by induction, what does the assumption P(k) lead to?",
            "options": [
              "It leads to P(k) being true for all integers",
              "It leads to P(k+1) being true",
              "It leads to a contradiction",
              "It concludes the proof"
            ],
            "answer": "It leads to P(k+1) being true"
          },
          {
            "question": "(23) What is the formula for the sum of the first n positive odd integers?",
            "options": [
              "n(n+1)/2",
              "n²",
              "2n - 1",
              "n × (n + 1)"
            ],
            "answer": "n²"
          },
          {
            "question": "(24) What is the outcome of using mathematical induction to prove the inequality n < 2ⁿ for all positive integers n?",
            "options": [
              "It is false for all n ≥ 5",
              "It is true for all n ≥ 1",
              "It is true for all n ≥ 10",
              "It is false for n = 1"
            ],
            "answer": "It is true for all n ≥ 1"
          },
          {
            "question": "(25) How is the induction hypothesis used in the proof of inequalities like n < 2ⁿ?",
            "options": [
              "By assuming P(k) holds, and showing P(k + 1) holds",
              "By calculating each term individually",
              "By simplifying the terms directly",
              "By proving P(k) is true for all integers"
            ],
            "answer": "By assuming P(k) holds, and showing P(k + 1) holds"
          },
          {
            "question": "(26) What does the inductive step typically involve?",
            "options": [
              "Proving P(k+1) by using P(k)",
              "Proving the base case",
              "Using a formula directly without assumptions",
              "Verifying the general form of the expression"
            ],
            "answer": "Proving P(k+1) by using P(k)"
          },
          {
            "question": "(27) Which of the following is an example of a formula proven by mathematical induction?",
            "options": [
              "2ⁿ < n! for all n ≥ 4",
              "1 + 3 + 5 + ... + (2n - 1) = n²",
              "n³ - n is divisible by 3 for all positive integers n",
              "All of the above"
            ],
            "answer": "All of the above"
          },
          {
            "question": "(28) What does the principle of mathematical induction help us prove about an infinite set?",
            "options": [
              "It helps us prove the existence of elements in the set",
              "It helps us prove that a property holds for all elements of the set",
              "It helps us prove that the set is finite",
              "It helps us prove the divisibility of elements"
            ],
            "answer": "It helps us prove that a property holds for all elements of the set"
          },
          {
            "question": "(29) Which of the following is used to prove inequalities by induction?",
            "options": [
              "The inductive hypothesis",
              "The base case only",
              "Direct calculation",
              "Approximation"
            ],
            "answer": "The inductive hypothesis"
          },
          {
            "question": "(30) What does the principle of mathematical induction rely on?",
            "options": [
              "The assumption that the statement is true for all numbers",
              "Proving a statement for all numbers greater than zero",
              "Proving the statement holds for the first integer and then assuming it holds for all subsequent integers",
              "Using an algebraic formula to prove the statement"
            ],
            "answer": "Proving the statement holds for the first integer and then assuming it holds for all subsequent integers"
          },
          {
            "question": "(31) What is the primary purpose of mathematical induction?",
            "options": [
              "To prove statements for all integers greater than zero",
              "To prove inequalities between numbers",
              "To prove statements that hold for all integers",
              "To establish the base case"
            ],
            "answer": "To prove statements that hold for all integers"
          },
          {
            "question": "(32) How do you prove that a summation formula is correct using mathematical induction?",
            "options": [
              "By calculating each term individually",
              "By assuming the formula holds for k and showing it holds for k+1",
              "By simplifying the sum directly",
              "By checking the first few terms of the sum"
            ],
            "answer": "By assuming the formula holds for k and showing it holds for k+1"
          },
          {
            "question": "(33) What is the goal when using mathematical induction to prove divisibility results?",
            "options": [
              "To show that an expression is always divisible by a number for all integers",
              "To prove that an expression is divisible by zero",
              "To simplify the expression",
              "To find the greatest common divisor"
            ],
            "answer": "To show that an expression is always divisible by a number for all integers"
          },
          {
            "question": "(34) How do you prove that n³ - n is divisible by 3 for all positive integers?",
            "options": [
              "By checking the first few cases",
              "By using algebraic simplification",
              "By applying the principle of mathematical induction",
              "By verifying the divisibility of each term"
            ],
            "answer": "By applying the principle of mathematical induction"
          },
          {
            "question": "(35) In the proof by induction for n³ - n, what is the inductive hypothesis?",
            "options": [
              "Assume k³ - k is divisible by 3",
              "Assume k² - k is divisible by 3",
              "Assume (k+1)³ - (k+1) is divisible by 3",
              "Assume k³ - k is true for all integers"
            ],
            "answer": "Assume k³ - k is divisible by 3"
          },
          {
            "question": "(36) What is an example of a problem solved by mathematical induction involving combinatorics?",
            "options": [
              "Proving the sum of the first n odd integers",
              "Proving a statement about primes",
              "Proving that a sequence converges",
              "Proving an inequality for all positive integers"
            ],
            "answer": "Proving the sum of the first n odd integers"
          },
          {
            "question": "(37) What does the inductive step prove in mathematical induction?",
            "options": [
              "That the statement holds for the next integer",
              "That the base case holds true",
              "That all terms of the sequence hold true",
              "That the formula is valid"
            ],
            "answer": "That the statement holds for the next integer"
          },
          {
            "question": "(38) Which of the following is an important aspect of using mathematical induction?",
            "options": [
              "The base case must be verified first",
              "The inductive hypothesis must always be false",
              "The proof must always involve numerical calculations",
              "The final conclusion must always be false"
            ],
            "answer": "The base case must be verified first"
          },
          {
            "question": "(39) In mathematical induction, what is the usual conclusion?",
            "options": [
              "The statement holds for a finite number of integers",
              "The statement holds for all positive integers greater than k",
              "The statement holds for all positive integers",
              "The statement is true for all real numbers"
            ],
            "answer": "The statement holds for all positive integers"
          },
          {
            "question": "(40) Which of the following problems can be solved using mathematical induction?",
            "options": [
              "Proving inequalities between two variables",
              "Proving divisibility rules",
              "Proving the correctness of a summation formula",
              "All of the above"
            ],
            "answer": "All of the above"
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