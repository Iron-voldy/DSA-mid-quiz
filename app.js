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
      "title": "q1",
      "questions": [
        {
          "question": "What is a set in mathematics?",
          "options": [
            "A collection of well-defined objects",
            "A collection of numbers only",
            "A collection of only integers",
            "A collection of variables"
          ],
          "answer": "A collection of well-defined objects"
        },
        {
          "question": "Which of the following is a subset of { 1, 2, 3 }?",
          "options": [
            "{ 2, 3 }",
            "{ 3, 4 }",
            "{ 4, 5 }",
            "{ 5 }"
          ],
          "answer": "{ 2, 3 }"
        },
        {
          "question": "Which of the following is not a set?",
          "options": [
            "{ 1, 2, 3, 4 }",
            "{ a, b, c }",
            "{ 1, 2, 3, 3 }",
            "{ x | x > 0 }"
          ],
          "answer": "{ 1, 2, 3, 3 }"
        },
        {
          "question": "What is the cardinality of the set A = {2, 4, 6, 8}?",
          "options": [
            "4",
            "5",
            "3",
            "6"
          ],
          "answer": "4"
        },
        {
          "question": "Which operation is used to find the common elements between two sets?",
          "options": [
            "Union",
            "Intersection",
            "Difference",
            "Symmetric difference"
          ],
          "answer": "Intersection"
        },
        {
          "question": "What is the universal set in set theory?",
          "options": [
            "The set containing all subsets",
            "The set containing no elements",
            "The set containing all elements under consideration",
            "A set with elements of the same type"
          ],
          "answer": "The set containing all elements under consideration"
        },
        {
          "question": "What is the complement of a set A = {1, 2, 3} if the universal set is U = {1, 2, 3, 4, 5}?",
          "options": [
            "{ 4, 5 }",
            "{ 1, 2, 3 }",
            "{ 4, 5, 6 }",
            "{ 1, 3 }"
          ],
          "answer": "{ 4, 5 }"
        },
        {
          "question": "What is the result of A ∪ B where A = {1, 2} and B = {2, 3}?",
          "options": [
            "{ 1, 2 }",
            "{ 1, 2, 3 }",
            "{ 3 }",
            "{ 1 }"
          ],
          "answer": "{ 1, 2, 3 }"
        },
        {
          "question": "Which of the following represents the power set of {1, 2}?",
          "options": [
            "{ {1, 2}, {1}, {2}, ∅ }",
            "{ 1, 2, 3 }",
            "{ 1, 2 }",
            "{ 1, 3 }"
          ],
          "answer": "{ {1, 2}, {1}, {2}, ∅ }"
        },
        {
          "question": "What is the difference between two sets A and B?",
          "options": [
            "The elements that are in A but not in B",
            "The elements that are in B but not in A",
            "The common elements of both sets",
            "The total number of elements in both sets"
          ],
          "answer": "The elements that are in A but not in B"
        },
        {
          "question": "If A = {1, 2, 3} and B = {2, 3, 4}, what is A ∩ B?",
          "options": [
            "{ 1, 2 }",
            "{ 3, 4 }",
            "{ 2, 3 }",
            "{ 1, 4 }"
          ],
          "answer": "{ 2, 3 }"
        },
        {
          "question": "Which of the following is the correct notation for the complement of a set A?",
          "options": [
            "A'",
            "A^c",
            "A^{-1}",
            "Both a and b"
          ],
          "answer": "Both a and b"
        },
        {
          "question": "What is the union of the sets A = {1, 2} and B = {3, 4}?",
          "options": [
            "{ 1, 2, 3, 4 }",
            "{ 1, 2 }",
            "{ 3, 4 }",
            "{ 1, 3 }"
          ],
          "answer": "{ 1, 2, 3, 4 }"
        },
        {
          "question": "Which of the following sets is infinite?",
          "options": [
            "{ 1, 2, 3 }",
            "{ x | x ∈ ℕ, x > 0 }",
            "{ }",
            "{ 1, 2, 2, 3 }"
          ],
          "answer": "{ x | x ∈ ℕ, x > 0 }"
        },
        {
          "question": "What is the symmetric difference between two sets A and B?",
          "options": [
            "The set of elements that are in both A and B",
            "The set of elements that are only in A or B, but not both",
            "The union of A and B",
            "The intersection of A and B"
          ],
          "answer": "The set of elements that are only in A or B, but not both"
        },
        {
          "question": "Which of the following is a proper subset of A = {1, 2, 3}?",
          "options": [
            "{ 1, 2, 3 }",
            "{ 2, 3 }",
            "{ 4, 5 }",
            "{ 1, 2, 4 }"
          ],
          "answer": "{ 2, 3 }"
        },
        {
          "question": "Which of the following is not a valid set?",
          "options": [
            "{ 1, 2, 3 }",
            "{ x | x ∈ ℕ, x < 5 }",
            "{ 1, 2, 2 }",
            "{ 1, 2, 3, 4 }"
          ],
          "answer": "{ 1, 2, 2 }"
        },
        {
          "question": "What does the notation A ⊆ B mean?",
          "options": [
            "A is a subset of B",
            "A is a proper subset of B",
            "A and B are identical",
            "A is not a subset of B"
          ],
          "answer": "A is a subset of B"
        },
        {
          "question": "Which of the following is true for the empty set?",
          "options": [
            "It contains no elements",
            "It is a subset of every set",
            "It is a proper subset of every set",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "What is the power set of A = {1, 2}?",
          "options": [
            "{ {1}, {2}, {1, 2}, ∅ }",
            "{ {1, 2}, ∅ }",
            "{ {1}, {2} }",
            "{ {1, 2} }"
          ],
          "answer": "{ {1}, {2}, {1, 2}, ∅ }"
        }
      ]
    },
    {
      "title": "q2",
      "questions": [
        {
          "question": "What is a function?",
          "options": [
            "A relation between a set of inputs and a set of outputs",
            "A relation where every input corresponds to multiple outputs",
            "A set of ordered pairs",
            "A set of numbers"
          ],
          "answer": "A relation between a set of inputs and a set of outputs"
        },
        {
          "question": "What is the domain of a function?",
          "options": [
            "The set of all possible outputs",
            "The set of all possible inputs",
            "The range of the function",
            "The set of all ordered pairs"
          ],
          "answer": "The set of all possible inputs"
        },
        {
          "question": "What is the range of a function?",
          "options": [
            "The set of all possible outputs",
            "The set of all possible inputs",
            "The domain of the function",
            "The set of all ordered pairs"
          ],
          "answer": "The set of all possible outputs"
        },
        {
          "question": "Which of the following is an example of an injective function?",
          "options": [
            "A function where every element in the domain maps to the same element in the codomain",
            "A function where every element in the domain maps to a unique element in the codomain",
            "A function with no outputs",
            "A function where all elements map to the same output"
          ],
          "answer": "A function where every element in the domain maps to a unique element in the codomain"
        },
        {
          "question": "What is an onto function?",
          "options": [
            "A function where every element in the codomain has at least one preimage in the domain",
            "A function where no element in the codomain has a preimage in the domain",
            "A function where the domain and codomain are identical",
            "A function where all elements map to the same output"
          ],
          "answer": "A function where every element in the codomain has at least one preimage in the domain"
        },
        {
          "question": "A function is said to be bijective if:",
          "options": [
            "It is both injective and surjective",
            "It is injective but not surjective",
            "It is surjective but not injective",
            "It is neither injective nor surjective"
          ],
          "answer": "It is both injective and surjective"
        },
        {
          "question": "What is the inverse of a function?",
          "options": [
            "A function that reverses the order of inputs and outputs",
            "A function that maps each output to multiple inputs",
            "A function that has no outputs",
            "A function that maps every input to the same output"
          ],
          "answer": "A function that reverses the order of inputs and outputs"
        },
        {
          "question": "What does the notation f: A → B represent?",
          "options": [
            "A relation from set A to set B",
            "A function from set A to set B",
            "A mapping from set B to set A",
            "A set of ordered pairs"
          ],
          "answer": "A function from set A to set B"
        },
        {
          "question": "Which of the following statements is true about functions?",
          "options": [
            "A function can have multiple outputs for the same input",
            "A function cannot have more than one input for the same output",
            "A function can have no output for some inputs",
            "A function must have exactly one output for each input"
          ],
          "answer": "A function must have exactly one output for each input"
        },
        {
          "question": "What is a bijection?",
          "options": [
            "A one-to-one correspondence between elements of the domain and codomain",
            "A function with no elements in the codomain",
            "A function that maps multiple elements to the same output",
            "A function that maps only one element to the same output"
          ],
          "answer": "A one-to-one correspondence between elements of the domain and codomain"
        },
        {
          "question": "What is the composition of functions f and g?",
          "options": [
            "(f ∘ g)(x) = f(g(x))",
            "(f ∘ g)(x) = g(f(x))",
            "(f ∘ g)(x) = x",
            "(f ∘ g)(x) = f(x) × g(x)"
          ],
          "answer": "(f ∘ g)(x) = f(g(x))"
        },
        {
          "question": "Which of the following is an example of a surjective function?",
          "options": [
            "A function where each element in the domain has a unique corresponding element in the codomain",
            "A function where every element in the codomain is mapped by at least one element from the domain",
            "A function that maps every element in the domain to the same element in the codomain",
            "A function where no element in the codomain is mapped"
          ],
          "answer": "A function where every element in the codomain is mapped by at least one element from the domain"
        },
        {
          "question": "What does the function f(x) = 2x + 3 represent?",
          "options": [
            "A non-linear function",
            "A linear function",
            "A constant function",
            "A surjective function only"
          ],
          "answer": "A linear function"
        },
        {
          "question": "Which of the following represents the inverse function of f(x) = 3x - 4?",
          "options": [
            "f^{-1}(x) = (x + 4)/3",
            "f^{-1}(x) = (x - 3)/4",
            "f^{-1}(x) = (x + 3)/4",
            "f^{-1}(x) = x/3"
          ],
          "answer": "f^{-1}(x) = (x + 4)/3"
        },
        {
          "question": "Which function is an example of a bijection?",
          "options": [
            "f(x) = x²",
            "f(x) = 3x + 2",
            "f(x) = 2x - 5",
            "f(x) = 1/x"
          ],
          "answer": "f(x) = 3x + 2"
        },
        {
          "question": "What does the domain of a function represent?",
          "options": [
            "The set of all possible outputs",
            "The set of all possible inputs",
            "The set of all values in the range",
            "The set of all possible values of the function"
          ],
          "answer": "The set of all possible inputs"
        },
        {
          "question": "What is a one-to-one function?",
          "options": [
            "A function where every output has a corresponding input",
            "A function where every input has a unique output",
            "A function where no two inputs have the same output",
            "Both b and c"
          ],
          "answer": "Both b and c"
        },
        {
          "question": "What is the range of the function f(x) = x² when the domain is x ≥ 0?",
          "options": [
            "[0, ∞)",
            "(-∞, ∞)",
            "(-∞, 0]",
            "[0, ∞) ∪ (-∞, 0]"
          ],
          "answer": "[0, ∞)"
        },
        {
          "question": "How is a function f(x) = x³ - 5 described?",
          "options": [
            "A polynomial function",
            "A linear function",
            "A piecewise function",
            "A trigonometric function"
          ],
          "answer": "A polynomial function"
        },
        {
          "question": "What is the inverse of f(x) = 2x + 1?",
          "options": [
            "f^{-1}(x) = (x - 1)/2",
            "f^{-1}(x) = 2x + 1",
            "f^{-1}(x) = (x + 1)/2",
            "f^{-1}(x) = x - 1"
          ],
          "answer": "f^{-1}(x) = (x - 1)/2"
        }
      ]
    },
    {
      "title": "q3",
      "questions": [
        {
          "question": "What is a sequence in mathematics?",
          "options": [
            "A set of elements arranged in any order",
            "A collection of numbers where order does not matter",
            "A list of numbers in a specific order",
            "A pair of numbers"
          ],
          "answer": "A list of numbers in a specific order"
        },
        {
          "question": "What does the nth term of a sequence represent?",
          "options": [
            "The number of terms in the sequence",
            "The sum of the first n terms",
            "The individual term at position n",
            "The average of the terms"
          ],
          "answer": "The individual term at position n"
        },
        {
          "question": "What is the common difference in an arithmetic sequence?",
          "options": [
            "The difference between consecutive terms",
            "The ratio between consecutive terms",
            "The sum of the first and last term",
            "The total number of terms in the sequence"
          ],
          "answer": "The difference between consecutive terms"
        },
        {
          "question": "What is the general form of an arithmetic sequence?",
          "options": [
            "a_n = a_1 + (n - 1)d",
            "a_n = a_1 × r^{n-1}",
            "a_n = a_1 + d",
            "a_n = a_1 + r"
          ],
          "answer": "a_n = a_1 + (n - 1)d"
        },
        {
          "question": "What is the common ratio in a geometric sequence?",
          "options": [
            "The ratio between the first and last terms",
            "The ratio between consecutive terms",
            "The difference between consecutive terms",
            "The sum of all terms"
          ],
          "answer": "The ratio between consecutive terms"
        },
        {
          "question": "How is the sum of the first n terms of an arithmetic sequence calculated?",
          "options": [
            "S_n = (n/2)(a_1 + a_n)",
            "S_n = a_1 × n",
            "S_n = n²/2",
            "S_n = n × a_n"
          ],
          "answer": "S_n = (n/2)(a_1 + a_n)"
        },
        {
          "question": "What is the nth term of the geometric sequence 3, 6, 12, 24, ...?",
          "options": [
            "a_n = 3 × 2^{n-1}",
            "a_n = 3 × n²",
            "a_n = 3 + 2n",
            "a_n = 3 × n"
          ],
          "answer": "a_n = 3 × 2^{n-1}"
        },
        {
          "question": "Which of the following is true for the sequence 1, 4, 7, 10, ...?",
          "options": [
            "It is an arithmetic sequence with common difference 2",
            "It is a geometric sequence with common ratio 2",
            "It is an arithmetic sequence with common difference 3",
            "It is a geometric sequence with common ratio 3"
          ],
          "answer": "It is an arithmetic sequence with common difference 3"
        },
        {
          "question": "What is the sum of the first 5 terms of the arithmetic sequence 2, 5, 8, 11, 14?",
          "options": [
            "40",
            "45",
            "50",
            "55"
          ],
          "answer": "45"
        },
        {
          "question": "What is the nth term of the sequence 2, 4, 6, 8, 10?",
          "options": [
            "a_n = 2n",
            "a_n = 2n - 1",
            "a_n = 2 + n",
            "a_n = 2n + 1"
          ],
          "answer": "a_n = 2n"
        },
        {
          "question": "In the geometric sequence 2, 6, 18, 54, ..., what is the 5th term?",
          "options": [
            "162",
            "216",
            "324",
            "432"
          ],
          "answer": "162"
        },
        {
          "question": "What is the sum of the first 4 terms of the sequence 1, 2, 4, 8?",
          "options": [
            "15",
            "16",
            "14",
            "13"
          ],
          "answer": "15"
        },
        {
          "question": "What is the nth term of a sequence 3, 6, 12, 24, ...?",
          "options": [
            "a_n = 3 × 2^{n-1}",
            "a_n = 3^n",
            "a_n = 3n",
            "a_n = 3 × 2n"
          ],
          "answer": "a_n = 3 × 2^{n-1}"
        },
        {
          "question": "Which of the following is a recursive formula for the sequence 1, 4, 7, 10, ...?",
          "options": [
            "a_1 = 1, a_n = a_{n-1} + 3",
            "a_1 = 1, a_n = a_{n-1} × 3",
            "a_1 = 3, a_n = a_{n-1} + 2",
            "a_1 = 2, a_n = a_{n-1} + 4"
          ],
          "answer": "a_1 = 1, a_n = a_{n-1} + 3"
        },
        {
          "question": "What is the general form of the sum of a geometric series?",
          "options": [
            "S_n = a_1(1 - r^n)/(1 - r)",
            "S_n = a_1/r^n",
            "S_n = r^n/a_1",
            "S_n = a_1 × r^n"
          ],
          "answer": "S_n = a_1(1 - r^n)/(1 - r)"
        },
        {
          "question": "What is the 3rd term of the arithmetic sequence 5, 8, 11, 14, ...?",
          "options": [
            "11",
            "12",
            "13",
            "14"
          ],
          "answer": "11"
        },
        {
          "question": "What is the nth term of the sequence 2, 6, 18, 54, ...?",
          "options": [
            "a_n = 2^n",
            "a_n = 2 × 3^{n-1}",
            "a_n = 3^n",
            "a_n = 6 × 3^{n-1}"
          ],
          "answer": "a_n = 2 × 3^{n-1}"
        },
        {
          "question": "In the arithmetic sequence 2, 5, 8, 11, ..., what is the common difference?",
          "options": [
            "1",
            "2",
            "3",
            "4"
          ],
          "answer": "3"
        },
        {
          "question": "What is the sum of the first 10 terms of the arithmetic sequence 3, 6, 9, 12, ...?",
          "options": [
            "150",
            "180",
            "120",
            "100"
          ],
          "answer": "180"
        },
        {
          "question": "What is the nth term of the sequence 1, 2, 4, 8, 16, ...?",
          "options": [
            "a_n = 2^n",
            "a_n = 2n",
            "a_n = 2^{n-1}",
            "a_n = 2 × n"
          ],
          "answer": "a_n = 2^{n-1}"
        }
      ]
    },
    {
      "title": "q4",
      "questions": [
        {
          "question": "How many ways can you arrange 3 letters from the set {A, B, C, D}?",
          "options": [
            "6",
            "12",
            "9",
            "15"
          ],
          "answer": "6"
        },
        {
          "question": "If a committee of 3 members is selected from a group of 5, how many different committees can be formed?",
          "options": [
            "5",
            "10",
            "15",
            "20"
          ],
          "answer": "10"
        },
        {
          "question": "What is the number of permutations of the word \"APPLE\"?",
          "options": [
            "60",
            "120",
            "24",
            "10"
          ],
          "answer": "60"
        },
        {
          "question": "What is the number of ways to select 2 items from a set of 5 items where order does not matter?",
          "options": [
            "5",
            "10",
            "15",
            "20"
          ],
          "answer": "10"
        },
        {
          "question": "How many ways can you choose 3 objects from 7 distinct objects?",
          "options": [
            "7",
            "20",
            "35",
            "70"
          ],
          "answer": "35"
        },
        {
          "question": "What is the number of distinct arrangements of the letters in the word \"SUCCESS\"?",
          "options": [
            "2520",
            "5040",
            "720",
            "120"
          ],
          "answer": "2520"
        },
        {
          "question": "How many ways can 4 people be seated in a row of 4 chairs?",
          "options": [
            "24",
            "12",
            "6",
            "4"
          ],
          "answer": "24"
        },
        {
          "question": "What is the number of ways to select 3 objects from a set of 5 objects with repetition?",
          "options": [
            "\\binom{5+3-1}{3}",
            "\\binom{5}{3}",
            "\\binom{5+3-1}{2}",
            "\\binom{5+3}{3}"
          ],
          "answer": "\\binom{5+3-1}{3}"
        },
        {
          "question": "How many different ways can you arrange the letters in the word \"COMPUTER\"?",
          "options": [
            "40320",
            "5040",
            "6720",
            "720"
          ],
          "answer": "40320"
        },
        {
          "question": "What is the formula for calculating combinations?",
          "options": [
            "\\binom{n}{r} = \\frac{n!}{r!(n - r)!}",
            "\\binom{n}{r} = n!",
            "\\binom{n}{r} = \\frac{r!}{n!}",
            "\\binom{n}{r} = \\frac{n!}{r!}"
          ],
          "answer": "\\binom{n}{r} = \\frac{n!}{r!(n - r)!}"
        },
        {
          "question": "How many ways can you arrange the letters of the word \"EXAMPLE\"?",
          "options": [
            "5040",
            "420",
            "2520",
            "10080"
          ],
          "answer": "420"
        },
        {
          "question": "What is the number of ways to arrange 4 objects from 8 distinct objects without repetition?",
          "options": [
            "8!",
            "8 × 7 × 6 × 5",
            "\\binom{8}{4}",
            "\\frac{8!}{4!}"
          ],
          "answer": "8 × 7 × 6 × 5"
        },
        {
          "question": "How many ways can you select 2 items from a set of 5 items where order matters?",
          "options": [
            "5",
            "10",
            "20",
            "30"
          ],
          "answer": "30"
        },
        {
          "question": "How many different 3-digit numbers can be formed using the digits 1, 2, 3, 4, 5 with repetition allowed?",
          "options": [
            "125",
            "120",
            "15",
            "10"
          ],
          "answer": "125"
        },
        {
          "question": "How many ways can you choose 2 objects from 4 distinct objects?",
          "options": [
            "3",
            "6",
            "8",
            "10"
          ],
          "answer": "6"
        },
        {
          "question": "How many ways can 3 men and 3 women be arranged in a row?",
          "options": [
            "720",
            "60",
            "180",
            "120"
          ],
          "answer": "720"
        },
        {
          "question": "How many ways can you arrange 5 objects if two of them are identical?",
          "options": [
            "120",
            "60",
            "10",
            "24"
          ],
          "answer": "60"
        },
        {
          "question": "What is the total number of ways to choose 4 objects from a set of 7 objects, without repetition?",
          "options": [
            "35",
            "28",
            "21",
            "7"
          ],
          "answer": "35"
        },
        {
          "question": "What is the number of combinations of selecting 3 objects from a set of 8?",
          "options": [
            "56",
            "70",
            "84",
            "120"
          ],
          "answer": "70"
        }
      ]
    },
    {
      "title": "q5",
      "questions": [
        {
          "question": "How many ways can you choose 2 objects from a set of 4 objects with repetition allowed?",
          "options": [
            "10",
            "6",
            "15",
            "20"
          ],
          "answer": "15"
        },
        {
          "question": "What is the total number of ways to select 4 objects from 8 distinct objects where order does not matter and repetition is allowed?",
          "options": [
            "\\binom{8 + 4 - 1}{4}",
            "\\binom{8}{4}",
            "\\frac{8!}{4!}",
            "8^4"
          ],
          "answer": "\\binom{8 + 4 - 1}{4}"
        },
        {
          "question": "How many different ways can you arrange 4 objects from 6 distinct objects with repetition allowed?",
          "options": [
            "6^4",
            "\\binom{6}{4}",
            "\\frac{6!}{2!}",
            "120"
          ],
          "answer": "6^4"
        },
        {
          "question": "What is the number of ways to arrange the letters in the word \"DEAD\"?",
          "options": [
            "24",
            "12",
            "36",
            "72"
          ],
          "answer": "12"
        },
        {
          "question": "How many ways can you assign 3 distinct objects to 2 boxes with repetition allowed?",
          "options": [
            "2^3",
            "3^2",
            "2^2",
            "8"
          ],
          "answer": "2^3"
        },
        {
          "question": "How many ways can you distribute 10 identical balls into 4 distinct boxes?",
          "options": [
            "20",
            "30",
            "35",
            "120"
          ],
          "answer": "35"
        },
        {
          "question": "What is the number of ways to distribute 4 distinct objects into 3 boxes where each box can contain multiple objects?",
          "options": [
            "3^4",
            "4^3",
            "12^4",
            "\\frac{4!}{3!}"
          ],
          "answer": "3^4"
        },
        {
          "question": "What is the number of ways to arrange 2 distinct objects in 5 boxes with repetition allowed?",
          "options": [
            "25",
            "10",
            "16",
            "20"
          ],
          "answer": "25"
        },
        {
          "question": "How many ways can you select 3 distinct objects from a set of 6 objects where order does not matter and repetition is not allowed?",
          "options": [
            "\\binom{6}{3}",
            "\\binom{6 + 3 - 1}{3}",
            "\\frac{6!}{3!(6 - 3)!}",
            "6^3"
          ],
          "answer": "\\binom{6}{3}"
        },
        {
          "question": "How many different ways can you arrange the letters in the word \"BALLS\"?",
          "options": [
            "120",
            "60",
            "180",
            "72"
          ],
          "answer": "60"
        },
        {
          "question": "What is the number of ways to assign 3 distinct objects to 2 boxes if each box can contain multiple objects but at least one box must remain empty?",
          "options": [
            "3",
            "8",
            "4",
            "5"
          ],
          "answer": "4"
        },
        {
          "question": "How many ways can you arrange 5 objects from a set of 7 distinct objects without repetition?",
          "options": [
            "7!",
            "\\binom{7}{5}",
            "7 × 6 × 5 × 4 × 3",
            "\\frac{7!}{(7 - 5)!}"
          ],
          "answer": "\\frac{7!}{(7 - 5)!}"
        },
        {
          "question": "What is the number of ways to select 5 items from a set of 10 items with repetition allowed?",
          "options": [
            "\\binom{10 + 5 - 1}{5}",
            "\\binom{10}{5}",
            "\\binom{10}{3}",
            "10^5"
          ],
          "answer": "\\binom{10 + 5 - 1}{5}"
        },
        {
          "question": "What is the total number of ways to choose 4 objects from 8 distinct objects without repetition?",
          "options": [
            "\\binom{8}{4}",
            "\\frac{8!}{4!}",
            "\\binom{8}{5}",
            "8 × 7 × 6 × 5"
          ],
          "answer": "\\binom{8}{4}"
        },
        {
          "question": "How many different ways can you arrange 6 objects from a set of 10 distinct objects?",
          "options": [
            "\\binom{10}{6}",
            "10^6",
            "\\frac{10!}{(10 - 6)!}",
            "10 × 9 × 8 × 7"
          ],
          "answer": "\\frac{10!}{(10 - 6)!}"
        },
        {
          "question": "What is the number of ways to select 4 objects from 5 objects, with repetition allowed?",
          "options": [
            "35",
            "60",
            "70",
            "15"
          ],
          "answer": "15"
        },
        {
          "question": "How many ways can you arrange 4 objects with repetition from a set of 5 distinct objects?",
          "options": [
            "625",
            "25",
            "5",
            "120"
          ],
          "answer": "625"
        },
        {
          "question": "What is the total number of ways to select 3 objects from a set of 6 distinct objects without repetition?",
          "options": [
            "\\binom{6}{3}",
            "20",
            "30",
            "10"
          ],
          "answer": "\\binom{6}{3}"
        },
        {
          "question": "What is the number of ways to select 3 objects from a set of 4 distinct objects without repetition?",
          "options": [
            "\\binom{4}{3}",
            "10",
            "4",
            "20"
          ],
          "answer": "\\binom{4}{3}"
        },
        {
          "question": "How many ways can 3 objects be arranged in 2 boxes where repetition is allowed?",
          "options": [
            "2^3",
            "3^2",
            "6^3",
            "2^4"
          ],
          "answer": "2^3"
        }
      ]
    },
    {
      "title": "q6",
      "questions": [
        {
          "question": "What is the first step in a mathematical induction proof?",
          "options": [
            "Base case",
            "Inductive hypothesis",
            "Inductive step",
            "Conclusion"
          ],
          "answer": "Base case"
        },
        {
          "question": "In mathematical induction, the inductive hypothesis assumes that:",
          "options": [
            "The statement is true for all integers",
            "The statement is true for some arbitrary integer k",
            "The statement is true for k+1",
            "The statement is false for k+1"
          ],
          "answer": "The statement is true for some arbitrary integer k"
        },
        {
          "question": "Which of the following is true in the inductive step of a proof by induction?",
          "options": [
            "We show that P(k) implies P(k + 1)",
            "We show that P(k) is true for all integers",
            "We prove P(k) for a specific value of k",
            "We prove the base case"
          ],
          "answer": "We show that P(k) implies P(k + 1)"
        },
        {
          "question": "What does the base case in mathematical induction prove?",
          "options": [
            "That the statement is true for k+1",
            "That the statement is true for k",
            "That the statement is true for the starting integer, typically n = 1",
            "That the statement is true for all integers"
          ],
          "answer": "That the statement is true for the starting integer, typically n = 1"
        },
        {
          "question": "What does the principle of mathematical induction allow us to prove?",
          "options": [
            "That a statement holds for a finite number of values",
            "That a statement holds for all values greater than or equal to a certain integer",
            "That a statement is false for some values",
            "That a statement is true for all integers"
          ],
          "answer": "That a statement holds for all values greater than or equal to a certain integer"
        },
        {
          "question": "Which of the following is the correct format for a mathematical induction proof?",
          "options": [
            "Prove the base case, then prove the inductive step",
            "Prove the base case only",
            "Prove the inductive hypothesis only",
            "Prove the base case and assumption step"
          ],
          "answer": "Prove the base case, then prove the inductive step"
        },
        {
          "question": "What is the base case for the statement \"For all n ≥ 1, n² ≥ n\"?",
          "options": [
            "P(1): 1² ≥ 1",
            "P(1): 1² ≤ 1",
            "P(2): 2² ≥ 2",
            "P(3): 3² ≥ 3"
          ],
          "answer": "P(1): 1² ≥ 1"
        },
        {
          "question": "What is the inductive hypothesis?",
          "options": [
            "The assumption that the statement is true for k+1",
            "The assumption that the statement is true for an arbitrary k",
            "The assumption that the statement is true for all integers",
            "The assumption that the statement is false for k+1"
          ],
          "answer": "The assumption that the statement is true for an arbitrary k"
        },
        {
          "question": "In the inductive step of mathematical induction, we must prove:",
          "options": [
            "That P(k) holds for k + 1",
            "That P(k + 1) holds if P(k) is true",
            "That P(k) holds for a base case",
            "That P(k + 1) holds for all k"
          ],
          "answer": "That P(k + 1) holds if P(k) is true"
        },
        {
          "question": "What is the time complexity of mathematical induction?",
          "options": [
            "Constant time",
            "Linear time",
            "Exponential time",
            "Logarithmic time"
          ],
          "answer": "Constant time"
        },
        {
          "question": "What is an example of a proof that uses mathematical induction?",
          "options": [
            "Proving divisibility rules",
            "Proving properties of numbers and sequences",
            "Proving geometric properties",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "What is the principle of mathematical induction used for?",
          "options": [
            "To prove statements for all integers",
            "To find the greatest common divisor of two numbers",
            "To solve linear equations",
            "To compute the sum of a series"
          ],
          "answer": "To prove statements for all integers"
        },
        {
          "question": "What does P(k) mean in the context of mathematical induction?",
          "options": [
            "The proposition being proven",
            "The conclusion of the inductive hypothesis",
            "The base case",
            "The mathematical proof"
          ],
          "answer": "The proposition being proven"
        },
        {
          "question": "Which of the following is the key concept in mathematical induction?",
          "options": [
            "The inductive hypothesis",
            "The base case",
            "The conclusion",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "What does P(k+1) represent in a proof by induction?",
          "options": [
            "The next step to be proven",
            "The result from the base case",
            "The assumption that P(k) is true",
            "The conclusion from P(k)"
          ],
          "answer": "The next step to be proven"
        },
        {
          "question": "What is the common mistake in a proof by induction?",
          "options": [
            "Failing to prove the base case",
            "Failing to assume P(k) is true",
            "Assuming P(k+1) holds for all k",
            "Using incorrect induction formulas"
          ],
          "answer": "Failing to prove the base case"
        },
        {
          "question": "What is the principle of mathematical induction typically used to prove?",
          "options": [
            "The sum of a series",
            "Properties of sequences",
            "Divisibility rules",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "How do you prove that P(k) implies P(k+1) in mathematical induction?",
          "options": [
            "By assuming P(k) is true and deriving P(k+1)",
            "By directly proving P(k+1)",
            "By calculating the values of P(k)",
            "By proving P(k) for all integers"
          ],
          "answer": "By assuming P(k) is true and deriving P(k+1)"
        },
        {
          "question": "What does the inductive hypothesis prove in mathematical induction?",
          "options": [
            "That the statement holds for all integers",
            "That the base case is true",
            "That the statement is true for k",
            "That the statement holds for the next integer"
          ],
          "answer": "That the statement is true for k"
        },
        {
          "question": "How is mathematical induction used in combinatorics?",
          "options": [
            "To prove the number of ways to arrange objects",
            "To prove divisibility properties",
            "To count the number of subsets",
            "To prove properties of functions"
          ],
          "answer": "To prove the number of ways to arrange objects"
        }
      ]
    },
    {
      "title": "q7",
      "questions": [
        {
          "question": "What is a graph in mathematics?",
          "options": [
            "A set of vertices connected by edges",
            "A set of numbers arranged in order",
            "A sequence of vertices",
            "A linear diagram"
          ],
          "answer": "A set of vertices connected by edges"
        },
        {
          "question": "What is a vertex in a graph?",
          "options": [
            "An edge that connects two vertices",
            "A node in the graph",
            "A path between two nodes",
            "A label on the edge"
          ],
          "answer": "A node in the graph"
        },
        {
          "question": "What is an edge in a graph?",
          "options": [
            "A connection between two vertices",
            "A path between two nodes",
            "A subset of vertices",
            "A weight assigned to a vertex"
          ],
          "answer": "A connection between two vertices"
        },
        {
          "question": "What is the degree of a vertex?",
          "options": [
            "The number of edges connected to that vertex",
            "The number of adjacent vertices",
            "The total number of edges in the graph",
            "The weight of the vertex"
          ],
          "answer": "The number of edges connected to that vertex"
        },
        {
          "question": "What is a directed graph (digraph)?",
          "options": [
            "A graph where edges have no direction",
            "A graph where edges have a direction",
            "A graph with no edges",
            "A graph with multiple edges"
          ],
          "answer": "A graph where edges have a direction"
        },
        {
          "question": "What is an undirected graph?",
          "options": [
            "A graph where edges have no direction",
            "A graph where edges have a direction",
            "A graph that does not contain any edges",
            "A graph with multiple edges between vertices"
          ],
          "answer": "A graph where edges have no direction"
        },
        {
          "question": "What is the adjacency matrix of a graph?",
          "options": [
            "A matrix that represents the number of vertices",
            "A matrix that represents the number of edges",
            "A matrix where the element at (i, j) indicates whether there is an edge between vertex i and vertex j",
            "A matrix that stores the degree of each vertex"
          ],
          "answer": "A matrix where the element at (i, j) indicates whether there is an edge between vertex i and vertex j"
        },
        {
          "question": "What is an adjacency list?",
          "options": [
            "A list of all edges in the graph",
            "A list of all vertices in the graph",
            "A list where each vertex points to a list of vertices adjacent to it",
            "A list representing the degree of each vertex"
          ],
          "answer": "A list where each vertex points to a list of vertices adjacent to it"
        },
        {
          "question": "What is a path in a graph?",
          "options": [
            "A sequence of edges connecting two vertices",
            "A sequence of vertices connected by edges",
            "A cycle in the graph",
            "A set of edges"
          ],
          "answer": "A sequence of vertices connected by edges"
        },
        {
          "question": "What is a cycle in a graph?",
          "options": [
            "A path that starts and ends at the same vertex",
            "A sequence of vertices",
            "A closed set of edges",
            "A subgraph of the graph"
          ],
          "answer": "A path that starts and ends at the same vertex"
        },
        {
          "question": "What is the degree of a vertex in a directed graph?",
          "options": [
            "The number of edges connected to the vertex",
            "The number of outgoing edges from the vertex",
            "The number of incoming edges to the vertex",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "What is a spanning tree of a graph?",
          "options": [
            "A subgraph that includes all edges of the graph",
            "A subgraph that includes all vertices and is a tree",
            "A subgraph with no cycles",
            "A subgraph that includes all cycles"
          ],
          "answer": "A subgraph that includes all vertices and is a tree"
        },
        {
          "question": "How can the graph traversal technique BFS be described?",
          "options": [
            "Exploring all vertices from a starting vertex before backtracking",
            "Exploring vertices level by level",
            "Exploring the vertices in a depth-first manner",
            "Searching the graph using recursion"
          ],
          "answer": "Exploring vertices level by level"
        },
        {
          "question": "Which data structure is used in BFS for storing vertices to be visited?",
          "options": [
            "Stack",
            "Queue",
            "Array",
            "Linked list"
          ],
          "answer": "Queue"
        },
        {
          "question": "What is the time complexity of BFS on a graph with V vertices and E edges?",
          "options": [
            "O(V)",
            "O(E)",
            "O(V + E)",
            "O(V²)"
          ],
          "answer": "O(V + E)"
        },
        {
          "question": "What is the DFS algorithm used for in graph theory?",
          "options": [
            "To find the shortest path between two vertices",
            "To explore the graph in breadth-first order",
            "To explore deeper into the graph and backtrack when necessary",
            "To traverse a tree in a level-by-level manner"
          ],
          "answer": "To explore deeper into the graph and backtrack when necessary"
        },
        {
          "question": "What is the time complexity of DFS on a graph with V vertices and E edges?",
          "options": [
            "O(V)",
            "O(E)",
            "O(V + E)",
            "O(V²)"
          ],
          "answer": "O(V + E)"
        },
        {
          "question": "How does DFS handle vertices with no unvisited adjacent vertices?",
          "options": [
            "It backtracks and visits the previous unvisited vertex",
            "It continues visiting vertices in the graph",
            "It terminates the algorithm",
            "It revisits the last visited vertex"
          ],
          "answer": "It backtracks and visits the previous unvisited vertex"
        },
        {
          "question": "What is the purpose of graph traversal algorithms like BFS and DFS?",
          "options": [
            "To find the shortest path between two vertices",
            "To explore all the vertices and edges in the graph",
            "To detect cycles in the graph",
            "To find the maximum flow in the graph"
          ],
          "answer": "To explore all the vertices and edges in the graph"
        },
        {
          "question": "What is the main difference between BFS and DFS?",
          "options": [
            "BFS uses a stack, while DFS uses a queue",
            "DFS uses a stack, while BFS uses a queue",
            "BFS explores deeper, while DFS explores level by level",
            "DFS explores level by level, while BFS explores deeper"
          ],
          "answer": "DFS uses a stack, while BFS uses a queue"
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