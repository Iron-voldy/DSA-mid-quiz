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
      "title": "q1",
      "questions": [
        {
          "question": "Which of the following operations is used to add an item to a stack?",
          "options": [
            "Push",
            "Pop",
            "Peek",
            "Add"
          ],
          "answer": "Push"
        },
        {
          "question": "What is the main characteristic of a stack?",
          "options": [
            "First-In-First-Out",
            "Last-In-First-Out",
            "First-In-Last-Out",
            "Last-In-First-Last"
          ],
          "answer": "Last-In-First-Out"
        },
        {
          "question": "In a queue, where are insertions made?",
          "options": [
            "Front",
            "Middle",
            "Rear",
            "Either front or rear"
          ],
          "answer": "Rear"
        },
        {
          "question": "Which of the following is a valid application of a queue?",
          "options": [
            "Undo operation in text editors",
            "Web page history navigation",
            "Printing jobs",
            "All of the above"
          ],
          "answer": "Printing jobs"
        },
        {
          "question": "Which algorithm is based on the divide-and-conquer strategy?",
          "options": [
            "Merge Sort",
            "Quick Sort",
            "Binary Search",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "What is the worst-case time complexity of Quick Sort?",
          "options": [
            "O(n)",
            "O(n log n)",
            "O(n^2)",
            "O(log n)"
          ],
          "answer": "O(n^2)"
        },
        {
          "question": "In a binary tree, a node with no children is called a:",
          "options": [
            "Root",
            "Internal node",
            "Leaf",
            "Parent"
          ],
          "answer": "Leaf"
        },
        {
          "question": "Which traversal method of a binary tree is also known as \"Left-Root-Right\"?",
          "options": [
            "Pre-order",
            "In-order",
            "Post-order",
            "Level-order"
          ],
          "answer": "In-order"
        },
        {
          "question": "What is the time complexity of finding the maximum value in a binary search tree (BST)?",
          "options": [
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n log n)"
          ],
          "answer": "O(log n)"
        },
        {
          "question": "In recursion, which of the following is a necessary component?",
          "options": [
            "Recursion tree",
            "Base case",
            "Stack",
            "Iteration"
          ],
          "answer": "Base case"
        },
        {
          "question": "Which of the following is the correct pseudocode for calculating factorial using recursion?",
          "options": [
            "factorial(n) = n * factorial(n - 1)",
            "factorial(n) = factorial(n - 1) * n",
            "factorial(n) = n * factorial(n + 1)",
            "factorial(n) = n + factorial(n - 1)"
          ],
          "answer": "factorial(n) = n * factorial(n - 1)"
        },
        {
          "question": "What is the time complexity of the best case in Insertion Sort?",
          "options": [
            "O(n)",
            "O(n log n)",
            "O(n^2)",
            "O(1)"
          ],
          "answer": "O(n)"
        },
        {
          "question": "Which sorting algorithm is based on selecting the smallest element in the array and swapping it?",
          "options": [
            "Merge Sort",
            "Quick Sort",
            "Selection Sort",
            "Insertion Sort"
          ],
          "answer": "Selection Sort"
        },
        {
          "question": "Which of the following is true for a circular queue?",
          "options": [
            "Elements can be added or removed from any position",
            "The front and rear pointers are never reused",
            "The queue is implemented using a fixed-size array",
            "All of the above"
          ],
          "answer": "The queue is implemented using a fixed-size array"
        },
        {
          "question": "What is the space complexity of Merge Sort?",
          "options": [
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n log n)"
          ],
          "answer": "O(n)"
        },
        {
          "question": "Which of the following is true about recursion trees?",
          "options": [
            "They help visualize the recursive function calls",
            "They are used to compute time complexity",
            "Both a and b",
            "None of the above"
          ],
          "answer": "Both a and b"
        },
        {
          "question": "In a linked list, what is the time complexity to insert a new node at the beginning?",
          "options": [
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n^2)"
          ],
          "answer": "O(1)"
        },
        {
          "question": "Which of the following is NOT an operation that can be performed on a linked list?",
          "options": [
            "Insert",
            "Delete",
            "Find",
            "Reorder"
          ],
          "answer": "Reorder"
        },
        {
          "question": "Which of the following is true for a min-heap?",
          "options": [
            "The parent node is always smaller than its children",
            "The parent node is always larger than its children",
            "It is used in Quick Sort",
            "It stores the smallest value at the root of the tree"
          ],
          "answer": "The parent node is always smaller than its children"
        },
        {
          "question": "What is the time complexity of the 'MAX_HEAPIFY' operation?",
          "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n log n)"
          ],
          "answer": "O(log n)"
        },
        {
          "question": "What is the best way to avoid the worst-case scenario in Quick Sort?",
          "options": [
            "Use randomized pivot selection",
            "Use the median of three as the pivot",
            "Both a and b",
            "None of the above"
          ],
          "answer": "Both a and b"
        },
        {
          "question": "What is the purpose of the 'peek' operation in a stack?",
          "options": [
            "To remove the top element",
            "To view the top element without removing it",
            "To add a new element",
            "To check if the stack is empty"
          ],
          "answer": "To view the top element without removing it"
        },
        {
          "question": "What is the time complexity of the worst case for Merge Sort?",
          "options": [
            "O(n log n)",
            "O(n)",
            "O(n^2)",
            "O(log n)"
          ],
          "answer": "O(n log n)"
        },
        {
          "question": "Which data structure uses the principle of First-In-First-Out (FIFO)?",
          "options": [
            "Stack",
            "Queue",
            "Linked List",
            "Tree"
          ],
          "answer": "Queue"
        },
        {
          "question": "What is the time complexity of a binary search on a sorted array?",
          "options": [
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n log n)"
          ],
          "answer": "O(log n)"
        }
      ]
    },
    {
      "title": "q2",
      "questions": [
        {
          "question": "What is an algorithm?",
          "options": [
            "A well-defined computational procedure",
            "A data structure",
            "A type of software",
            "An abstract concept"
          ],
          "answer": "A well-defined computational procedure"
        },
        {
          "question": "Which of the following is NOT a property of an algorithm?",
          "options": [
            "Correctness",
            "Ambiguity",
            "Termination",
            "Simplicity"
          ],
          "answer": "Ambiguity"
        },
        {
          "question": "In the algorithm provided, what is the first step?",
          "options": [
            "Remove the smallest value from the input",
            "Output the smallest value",
            "Get the smallest value from the input",
            "Repeat the above steps until no items are left"
          ],
          "answer": "Get the smallest value from the input"
        },
        {
          "question": "What is a characteristic of a correct algorithm?",
          "options": [
            "It must run forever",
            "It must produce correct outputs for all cases",
            "It must use the least amount of memory",
            "It must terminate in linear time"
          ],
          "answer": "It must produce correct outputs for all cases"
        },
        {
          "question": "Which is a key application of algorithms in real life?",
          "options": [
            "Data retrieval",
            "Sorting",
            "Searching",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "What is pseudocode used for?",
          "options": [
            "Writing complex software",
            "Describing algorithms in a human-readable form",
            "Compiling algorithms",
            "Programming in any language"
          ],
          "answer": "Describing algorithms in a human-readable form"
        },
        {
          "question": "Which pseudocode notation is used to indicate a comment line?",
          "options": [
            "//",
            "#",
            "*",
            "--"
          ],
          "answer": "//"
        },
        {
          "question": "What does the notation \"A[1..i]\" mean in pseudocode?",
          "options": [
            "Access element A at index i",
            "Subarray of A from index 1 to i",
            "Subarray of A from index i to the end",
            "Subarray of A from index 1 to i-1"
          ],
          "answer": "Subarray of A from index 1 to i"
        },
        {
          "question": "Why do we need to analyze algorithms?",
          "options": [
            "To compare algorithms",
            "To predict the growth of runtime",
            "To determine the memory usage",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "Which of the following represents the worst-case time complexity of an algorithm?",
          "options": [
            "The minimum number of steps taken on any instance",
            "The maximum number of steps taken on any instance",
            "The average number of steps taken on any instance",
            "The number of steps taken on the best instance"
          ],
          "answer": "The maximum number of steps taken on any instance"
        },
        {
          "question": "In the RAM Model, each memory access takes:",
          "options": [
            "2 steps",
            "1 step",
            "3 steps",
            "0 steps"
          ],
          "answer": "1 step"
        },
        {
          "question": "What is the best case in algorithm analysis?",
          "options": [
            "The maximum number of steps taken",
            "The minimum number of steps taken",
            "The average number of steps",
            "The number of steps on the worst input"
          ],
          "answer": "The minimum number of steps taken"
        },
        {
          "question": "Which method is used for time complexity analysis that selects one or more operations like add, multiply, or compare?",
          "options": [
            "Step count method",
            "Operation count method",
            "Exact analysis",
            "Asymptotic notation"
          ],
          "answer": "Operation count method"
        },
        {
          "question": "In the RAM model, which of the following operations takes exactly one step?",
          "options": [
            "Memory access",
            "Assignment",
            "Comparison",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "How is the running time calculated in the RAM model?",
          "options": [
            "Sum of memory accesses",
            "Sum of steps",
            "Sum of comparisons",
            "Sum of variable assignments"
          ],
          "answer": "Sum of steps"
        },
        {
          "question": "What is the time complexity of displaying the numbers from 1 to 10 using the RAM model?",
          "options": [
            "10 steps",
            "20 steps",
            "42 steps",
            "46 steps"
          ],
          "answer": "42 steps"
        },
        {
          "question": "How many steps would it take to display the numbers from 10 to 20 using the RAM model?",
          "options": [
            "42 steps",
            "46 steps",
            "50 steps",
            "60 steps"
          ],
          "answer": "46 steps"
        },
        {
          "question": "Which algorithm is the most efficient when handling small numbers of elements?",
          "options": [
            "Merge Sort",
            "Quick Sort",
            "Insertion Sort",
            "Selection Sort"
          ],
          "answer": "Insertion Sort"
        },
        {
          "question": "What is the complexity of counting the steps in the RAM model for displaying even numbers from 10 to 20?",
          "options": [
            "42 steps",
            "63 steps",
            "50 steps",
            "35 steps"
          ],
          "answer": "63 steps"
        },
        {
          "question": "What are the problems with the RAM model?",
          "options": [
            "It doesn't account for different hardware architectures",
            "It only considers one type of memory access",
            "It ignores recursion",
            "It does not consider time complexity"
          ],
          "answer": "It doesn't account for different hardware architectures"
        },
        {
          "question": "Which of the following does the \"Operation count\" method NOT consider?",
          "options": [
            "Memory accesses",
            "Memory allocation",
            "Operations like add, multiply",
            "Comparisons"
          ],
          "answer": "Memory allocation"
        },
        {
          "question": "What is the primary disadvantage of using the RAM model?",
          "options": [
            "It ignores hardware performance",
            "It overestimates time complexity",
            "It cannot handle recursion",
            "It uses approximate values for memory access"
          ],
          "answer": "It ignores hardware performance"
        },
        {
          "question": "Which of the following is the most suitable method to analyze algorithm time complexity?",
          "options": [
            "Operation count",
            "Step count",
            "RAM model",
            "Exact analysis"
          ],
          "answer": "Step count"
        },
        {
          "question": "Which of the following is a correct property of an algorithm?",
          "options": [
            "It must run on any device",
            "It must terminate after a finite number of steps",
            "It must use as little memory as possible",
            "It must be written in a specific programming language"
          ],
          "answer": "It must terminate after a finite number of steps"
        },
        {
          "question": "What is the primary objective of analyzing the worst-case time complexity?",
          "options": [
            "To calculate the minimum number of steps",
            "To optimize memory usage",
            "To predict the maximum time the algorithm may take",
            "To find the best possible input"
          ],
          "answer": "To predict the maximum time the algorithm may take"
        }
      ]
    },
    {
      "title": "q3",
      "questions": [
        {
          "question": "What is the primary purpose of an algorithm?",
          "options": [
            "To store data",
            "To process data and produce an output",
            "To visualize data",
            "To keep data secure"
          ],
          "answer": "To process data and produce an output"
        },
        {
          "question": "What does the pseudocode for insertion sort start by doing?",
          "options": [
            "Sorting the array",
            "Assigning a key value",
            "Comparing the elements",
            "Initializing the array"
          ],
          "answer": "Assigning a key value"
        },
        {
          "question": "In the insertion sort algorithm, what does the `while` loop check?",
          "options": [
            "If the array is sorted",
            "If the next element is smaller than the current element",
            "If the current element is larger than the key",
            "If the key is correctly placed"
          ],
          "answer": "If the current element is larger than the key"
        },
        {
          "question": "In the worst case, what is the time complexity of the insertion sort?",
          "options": [
            "O(n log n)",
            "O(n^2)",
            "O(n)",
            "O(log n)"
          ],
          "answer": "O(n^2)"
        },
        {
          "question": "What does the Big O notation primarily represent?",
          "options": [
            "The upper bound of the algorithm's running time",
            "The lower bound of the algorithm's running time",
            "The exact running time",
            "The input size"
          ],
          "answer": "The upper bound of the algorithm's running time"
        },
        {
          "question": "Which of the following is true for the best-case time complexity of insertion sort?",
          "options": [
            "O(n^2)",
            "O(n log n)",
            "O(n)",
            "O(1)"
          ],
          "answer": "O(n)"
        },
        {
          "question": "What does the Ω (Omega) notation provide?",
          "options": [
            "Upper bound",
            "Exact time complexity",
            "Lower bound",
            "Average case complexity"
          ],
          "answer": "Lower bound"
        },
        {
          "question": "What is the meaning of the Θ (Theta) notation?",
          "options": [
            "It provides the upper bound",
            "It provides the lower bound",
            "It bounds the function both from above and below",
            "It provides the worst-case complexity"
          ],
          "answer": "It bounds the function both from above and below"
        },
        {
          "question": "What does the expression O(n^2) mean for an algorithm?",
          "options": [
            "The time increases linearly with input size",
            "The time increases exponentially with input size",
            "The time increases quadratically with input size",
            "The time stays constant"
          ],
          "answer": "The time increases quadratically with input size"
        },
        {
          "question": "In the context of Big O notation, what is the dominant term in the function 3n^2 + 5n + 8?",
          "options": [
            "8",
            "5n",
            "n^2",
            "3n^2"
          ],
          "answer": "n^2"
        },
        {
          "question": "In insertion sort, which of the following operations is repeated for every element?",
          "options": [
            "Comparison with the key",
            "Shifting elements to the right",
            "Moving the key to its correct position",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "How many comparisons does insertion sort make in the best-case scenario?",
          "options": [
            "O(n^2)",
            "O(n log n)",
            "O(n)",
            "O(1)"
          ],
          "answer": "O(n)"
        },
        {
          "question": "Which of the following time complexities describes the worst-case behavior of insertion sort?",
          "options": [
            "O(n log n)",
            "O(n)",
            "O(n^2)",
            "O(log n)"
          ],
          "answer": "O(n^2)"
        },
        {
          "question": "How does the insertion sort algorithm compare to other sorting algorithms like QuickSort and MergeSort?",
          "options": [
            "Insertion sort is slower for large data sets",
            "Insertion sort is faster for large data sets",
            "Insertion sort is not a sorting algorithm",
            "Insertion sort has better worst-case performance"
          ],
          "answer": "Insertion sort is slower for large data sets"
        },
        {
          "question": "What is the role of the `key` variable in insertion sort?",
          "options": [
            "It stores the current index of the array",
            "It stores the current element to be inserted into the sorted part of the array",
            "It stores the final sorted array",
            "It keeps track of the number of comparisons"
          ],
          "answer": "It stores the current element to be inserted into the sorted part of the array"
        },
        {
          "question": "What is the best-case time complexity of insertion sort when the array is already sorted?",
          "options": [
            "O(n^2)",
            "O(n log n)",
            "O(n)",
            "O(1)"
          ],
          "answer": "O(n)"
        },
        {
          "question": "Which notation is used to describe the upper bound of an algorithm's running time?",
          "options": [
            "Ω (Omega)",
            "Θ (Theta)",
            "O (Big O)",
            "None of the above"
          ],
          "answer": "O (Big O)"
        },
        {
          "question": "Which of the following is an example of an algorithm with a time complexity of O(n log n)?",
          "options": [
            "Bubble sort",
            "Merge sort",
            "Insertion sort",
            "Selection sort"
          ],
          "answer": "Merge sort"
        },
        {
          "question": "How does the RAM model measure the running time of an algorithm?",
          "options": [
            "By counting the number of memory accesses and operations",
            "By counting the number of comparisons",
            "By measuring the input size",
            "By analyzing the number of array elements"
          ],
          "answer": "By counting the number of memory accesses and operations"
        },
        {
          "question": "Which of the following is the key concept in Big O notation?",
          "options": [
            "Exact performance of the algorithm",
            "Worst-case performance of the algorithm",
            "Average-case performance of the algorithm",
            "Best-case performance of the algorithm"
          ],
          "answer": "Worst-case performance of the algorithm"
        },
        {
          "question": "Which of the following is the Big O value of the function f(n) = 5n + 3n^2?",
          "options": [
            "O(n)",
            "O(n^2)",
            "O(n log n)",
            "O(1)"
          ],
          "answer": "O(n^2)"
        },
        {
          "question": "Which of the following is NOT part of the insertion sort pseudocode?",
          "options": [
            "Initialize the key",
            "Compare the key with elements to its left",
            "Shift elements to the left",
            "Merge the sorted and unsorted parts"
          ],
          "answer": "Merge the sorted and unsorted parts"
        },
        {
          "question": "In the worst-case scenario for insertion sort, how many iterations does the outer loop perform?",
          "options": [
            "n",
            "n^2",
            "n-1",
            "n log n"
          ],
          "answer": "n"
        },
        {
          "question": "What does the `while` loop in the insertion sort pseudocode accomplish?",
          "options": [
            "It shifts elements to the right",
            "It compares the key with the left-side elements",
            "It places the key in the correct position",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "What is the significance of Big O notation in algorithm analysis?",
          "options": [
            "It helps describe the algorithm's space requirements",
            "It gives an upper bound on the time complexity",
            "It helps understand the number of comparisons",
            "It shows the algorithm's exact execution time"
          ],
          "answer": "It gives an upper bound on the time complexity"
        }
      ]
    },
    {
      "title": "q4",
      "questions": [
        {
          "question": "What is the primary characteristic of a stack?",
          "options": [
            "FIFO (First-In-First-Out)",
            "LIFO (Last-In-First-Out)",
            "Priority-based",
            "Random access"
          ],
          "answer": "LIFO (Last-In-First-Out)"
        },
        {
          "question": "What operation is used to add an item to a stack?",
          "options": [
            "Pop",
            "Push",
            "Peek",
            "Remove"
          ],
          "answer": "Push"
        },
        {
          "question": "What operation is used to remove an item from the stack?",
          "options": [
            "Pop",
            "Push",
            "Peek",
            "Insert"
          ],
          "answer": "Pop"
        },
        {
          "question": "Which of the following operations in a stack allows access to the top item without removing it?",
          "options": [
            "Push",
            "Pop",
            "Peek",
            "Remove"
          ],
          "answer": "Peek"
        },
        {
          "question": "What is the time complexity of the push and pop operations in a stack?",
          "options": [
            "O(n)",
            "O(log n)",
            "O(1)",
            "O(n^2)"
          ],
          "answer": "O(1)"
        },
        {
          "question": "Which of the following is a real-world application of stacks?",
          "options": [
            "Undo operations in text editors",
            "Page visited history in web browsers",
            "Recursive function calling",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "In stack terminology, what does the term \"top\" refer to?",
          "options": [
            "The bottom-most item of the stack",
            "The item at the middle of the stack",
            "The last item added to the stack",
            "The first item added to the stack"
          ],
          "answer": "The last item added to the stack"
        },
        {
          "question": "Which of the following operations is NOT allowed in a stack?",
          "options": [
            "Insertion at the bottom",
            "Insertion at the top",
            "Deletion from the top",
            "Peek at the top"
          ],
          "answer": "Insertion at the bottom"
        },
        {
          "question": "What happens when you pop an item from an empty stack?",
          "options": [
            "It throws an error",
            "It returns null",
            "It returns a random value",
            "It does nothing"
          ],
          "answer": "It throws an error"
        },
        {
          "question": "What is the time complexity of the peek operation?",
          "options": [
            "O(n)",
            "O(1)",
            "O(log n)",
            "O(n^2)"
          ],
          "answer": "O(1)"
        },
        {
          "question": "Which of the following methods should you implement to check if a stack is empty?",
          "options": [
            "isEmpty()",
            "peek()",
            "push()",
            "pop()"
          ],
          "answer": "isEmpty()"
        },
        {
          "question": "What is the initial value of the `top` pointer in an empty stack?",
          "options": [
            "0",
            "1",
            "-1",
            "null"
          ],
          "answer": "-1"
        },
        {
          "question": "In a stack implemented using an array, which index represents the top of the stack?",
          "options": [
            "0",
            "The last index of the array",
            "The first index of the array",
            "The index indicated by the top pointer"
          ],
          "answer": "The index indicated by the top pointer"
        },
        {
          "question": "What is the maximum number of elements that can be stored in a stack of size 10?",
          "options": [
            "9",
            "10",
            "11",
            "Infinity"
          ],
          "answer": "10"
        },
        {
          "question": "In the provided stack implementation, what happens if you try to push an element when the stack is full?",
          "options": [
            "The element is added anyway",
            "The element is added, but a warning is displayed",
            "An error message is displayed",
            "Nothing happens"
          ],
          "answer": "An error message is displayed"
        },
        {
          "question": "Which of the following methods should be used to access the item at the top of a stack without removing it?",
          "options": [
            "pop()",
            "push()",
            "peek()",
            "top()"
          ],
          "answer": "peek()"
        },
        {
          "question": "What is the time complexity of checking if a stack is full?",
          "options": [
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n^2)"
          ],
          "answer": "O(1)"
        },
        {
          "question": "How would you implement the isFull() method in a stack?",
          "options": [
            "Return true if `top` is equal to `maxSize`",
            "Return true if `top` is equal to `maxSize - 1`",
            "Return true if `top` is equal to 0",
            "Return true if `top` is greater than 0"
          ],
          "answer": "Return true if `top` is equal to `maxSize - 1`"
        },
        {
          "question": "Which method in the stack implementation is used to insert an element into the stack?",
          "options": [
            "pop()",
            "peek()",
            "push()",
            "insert()"
          ],
          "answer": "push()"
        },
        {
          "question": "Which of the following methods would you use to remove an item from the stack?",
          "options": [
            "peek()",
            "pop()",
            "insert()",
            "remove()"
          ],
          "answer": "pop()"
        },
        {
          "question": "Which of the following applications of stacks involves the Last-In-First-Out (LIFO) principle?",
          "options": [
            "Undo in text editors",
            "Page navigation in browsers",
            "Function calls in recursion",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "Which of the following stack operations would result in an error if the stack is empty?",
          "options": [
            "peek()",
            "push()",
            "pop()",
            "isEmpty()"
          ],
          "answer": "pop()"
        },
        {
          "question": "What is the initial condition of the stack in terms of the `top` pointer when the stack is created?",
          "options": [
            "top = 0",
            "top = -1",
            "top = 1",
            "top = null"
          ],
          "answer": "top = -1"
        },
        {
          "question": "What will happen if you call peek() on an empty stack?",
          "options": [
            "It will throw an error",
            "It will return null",
            "It will return the last pushed item",
            "It will display a warning"
          ],
          "answer": "It will throw an error"
        },
        {
          "question": "Which of the following is an implementation detail for a stack?",
          "options": [
            "Using an array to store elements",
            "Using a linked list to store elements",
            "Maintaining a top pointer",
            "All of the above"
          ],
          "answer": "All of the above"
        }
      ]
    },
    {
      "title": "q5",
      "questions": [
        {
          "question": "What is the main characteristic of a queue?",
          "options": [
            "Last-In-First-Out (LIFO)",
            "First-In-First-Out (FIFO)",
            "Random access",
            "Priority-based"
          ],
          "answer": "First-In-First-Out (FIFO)"
        },
        {
          "question": "In a queue, where are insertions made?",
          "options": [
            "Front",
            "Middle",
            "Rear",
            "Either front or rear"
          ],
          "answer": "Rear"
        },
        {
          "question": "What operation is used to add an item to the queue?",
          "options": [
            "Push",
            "Pop",
            "Insert",
            "Remove"
          ],
          "answer": "Insert"
        },
        {
          "question": "What operation is used to remove an item from the queue?",
          "options": [
            "Peek",
            "Push",
            "Pop",
            "Remove"
          ],
          "answer": "Remove"
        },
        {
          "question": "Which of the following operations allows access to the front item of the queue without removing it?",
          "options": [
            "Pop",
            "Push",
            "PeekFront",
            "Remove"
          ],
          "answer": "PeekFront"
        },
        {
          "question": "What is the time complexity of the insert and remove operations in a queue?",
          "options": [
            "O(n)",
            "O(1)",
            "O(log n)",
            "O(n^2)"
          ],
          "answer": "O(1)"
        },
        {
          "question": "What is the time complexity of the peekFront operation?",
          "options": [
            "O(n)",
            "O(1)",
            "O(log n)",
            "O(n^2)"
          ],
          "answer": "O(1)"
        },
        {
          "question": "Which of the following is NOT an application of a queue?",
          "options": [
            "Undo sequence in text editors",
            "Printer queue",
            "CPU scheduling",
            "Page navigation in browsers"
          ],
          "answer": "Undo sequence in text editors"
        },
        {
          "question": "What happens if you try to remove an item from an empty queue?",
          "options": [
            "It throws an error",
            "It returns null",
            "It does nothing",
            "It returns the last element"
          ],
          "answer": "It throws an error"
        },
        {
          "question": "Which method checks if a queue is empty?",
          "options": [
            "peekFront()",
            "isFull()",
            "isEmpty()",
            "remove()"
          ],
          "answer": "isEmpty()"
        },
        {
          "question": "What is the initial value of the `front` pointer in an empty queue?",
          "options": [
            "0",
            "-1",
            "1",
            "null"
          ],
          "answer": "0"
        },
        {
          "question": "In the queue implementation, which pointer represents the end of the queue?",
          "options": [
            "front",
            "rear",
            "head",
            "tail"
          ],
          "answer": "rear"
        },
        {
          "question": "What is the maximum number of elements that can be stored in a queue of size 5?",
          "options": [
            "4",
            "5",
            "6",
            "Infinity"
          ],
          "answer": "5"
        },
        {
          "question": "Which of the following is true for a circular queue?",
          "options": [
            "The queue has a fixed front and rear pointer",
            "The queue allows unlimited insertion",
            "The rear pointer wraps around to the front when it reaches the end",
            "The queue can only be accessed from the front"
          ],
          "answer": "The rear pointer wraps around to the front when it reaches the end"
        },
        {
          "question": "What is the issue with a linear queue when elements are removed?",
          "options": [
            "It becomes empty immediately",
            "The space left at the front of the queue cannot be reused",
            "The queue automatically resets",
            "The front pointer moves forward to the rear pointer"
          ],
          "answer": "The space left at the front of the queue cannot be reused"
        },
        {
          "question": "How does a circular queue solve the issue of unused space?",
          "options": [
            "It dynamically resizes the array",
            "It allows the rear pointer to wrap around to the front",
            "It stores data in a linked list",
            "It resets the queue once it becomes full"
          ],
          "answer": "It allows the rear pointer to wrap around to the front"
        },
        {
          "question": "What is the method to add an item to the circular queue?",
          "options": [
            "insert()",
            "enqueue()",
            "add()",
            "push()"
          ],
          "answer": "insert()"
        },
        {
          "question": "In a circular queue, what happens if the front pointer reaches the last index?",
          "options": [
            "The queue stops accepting new items",
            "The front pointer wraps around to 0",
            "The queue is deleted",
            "The front pointer moves to the middle of the queue"
          ],
          "answer": "The front pointer wraps around to 0"
        },
        {
          "question": "What is the time complexity of the insert operation in a circular queue?",
          "options": [
            "O(n)",
            "O(log n)",
            "O(1)",
            "O(n^2)"
          ],
          "answer": "O(1)"
        },
        {
          "question": "What will happen if you try to insert into a full circular queue?",
          "options": [
            "The item will be added at the beginning",
            "The item will be added at the rear",
            "The queue will throw an overflow error",
            "The queue will automatically resize"
          ],
          "answer": "The queue will throw an overflow error"
        },
        {
          "question": "What is the role of the `front` pointer in a queue?",
          "options": [
            "It indicates where the next element will be inserted",
            "It indicates the last inserted element",
            "It points to the first element to be removed",
            "It tracks the number of elements in the queue"
          ],
          "answer": "It points to the first element to be removed"
        },
        {
          "question": "What is the method used to check if a queue is full?",
          "options": [
            "isFull()",
            "isEmpty()",
            "peek()",
            "remove()"
          ],
          "answer": "isFull()"
        },
        {
          "question": "How does the remove operation behave in a circular queue?",
          "options": [
            "It always removes the last item",
            "It moves the front pointer forward and removes the front item",
            "It randomly removes any item",
            "It removes the item at the rear"
          ],
          "answer": "It moves the front pointer forward and removes the front item"
        },
        {
          "question": "Which of the following is an advantage of using a circular queue?",
          "options": [
            "It uses less memory than a linear queue",
            "It allows unlimited insertion",
            "It prevents wastage of space",
            "It is easier to implement"
          ],
          "answer": "It prevents wastage of space"
        },
        {
          "question": "What will the program display after removing all items from the queue created with the following items: 10, 25, 55, 65, 85?",
          "options": [
            "10 25 55 65 85",
            "85 65 55 25 10",
            "Nothing",
            "An error message"
          ],
          "answer": "85 65 55 25 10"
        }
      ]
    },
    {
      "title": "q6",
      "questions": [
        {
          "question": "What is the main difference between arrays and linked lists?",
          "options": [
            "Arrays are more flexible than linked lists",
            "Linked lists allow direct access to elements by index",
            "Linked lists require traversal to access elements",
            "Arrays are used for dynamic memory allocation"
          ],
          "answer": "Linked lists require traversal to access elements"
        },
        {
          "question": "In a linked list, each link contains:",
          "options": [
            "Only data",
            "Data and a reference to the next link",
            "Data and a reference to the previous link",
            "A reference to the last link only"
          ],
          "answer": "Data and a reference to the next link"
        },
        {
          "question": "Which of the following is NOT a real-world application of a linked list?",
          "options": [
            "Music player song playlist",
            "Web browser history (back and forward buttons)",
            "Static array indexing",
            "Implementing queues and stacks"
          ],
          "answer": "Static array indexing"
        },
        {
          "question": "Which operation is used to find a link with a specific value in a linked list?",
          "options": [
            "Insert",
            "Delete",
            "Find",
            "Peek"
          ],
          "answer": "Find"
        },
        {
          "question": "How do you insert a new link at the beginning of a linked list?",
          "options": [
            "Change the first link to point to the new link",
            "Change the last link to point to the new link",
            "Shift all links to the right to accommodate the new link",
            "Create a new link and append it to the end"
          ],
          "answer": "Change the first link to point to the new link"
        },
        {
          "question": "What happens when you insert a new item after an existing item, such as after the link with value 17?",
          "options": [
            "The first item becomes the new last item",
            "The `next` field of the new link points to the link with value 17",
            "The new item becomes the new first item",
            "The list becomes unordered"
          ],
          "answer": "The `next` field of the new link points to the link with value 17"
        },
        {
          "question": "What is the method used to remove the first link in a linked list?",
          "options": [
            "deleteFirst()",
            "removeFirst()",
            "delete()",
            "remove()"
          ],
          "answer": "deleteFirst()"
        },
        {
          "question": "What happens when you delete an item from the middle of a linked list?",
          "options": [
            "The `next` field of the previous link is updated to skip the deleted link",
            "The link is simply removed without updating the list",
            "The entire list is deleted",
            "The first item becomes the new last item"
          ],
          "answer": "The `next` field of the previous link is updated to skip the deleted link"
        },
        {
          "question": "What is the time complexity of searching for a value in a singly linked list?",
          "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n^2)"
          ],
          "answer": "O(n)"
        },
        {
          "question": "What is the primary difference between a singly linked list and a doubly linked list?",
          "options": [
            "A doubly linked list stores references to both the next and previous links",
            "A singly linked list allows traversal in both directions",
            "A doubly linked list only stores references to the next link",
            "A singly linked list is more efficient in memory usage"
          ],
          "answer": "A doubly linked list stores references to both the next and previous links"
        },
        {
          "question": "In a doubly linked list, each link contains:",
          "options": [
            "A reference to the next link only",
            "A reference to the previous and next link",
            "Data and a reference to the previous link only",
            "Only data"
          ],
          "answer": "A reference to the previous and next link"
        },
        {
          "question": "Which of the following is a method used to check if a linked list is empty?",
          "options": [
            "isFull()",
            "isEmpty()",
            "checkEmpty()",
            "listEmpty()"
          ],
          "answer": "isEmpty()"
        },
        {
          "question": "What is the `next` field of the last link in a singly linked list?",
          "options": [
            "The data of the next link",
            "Null",
            "A reference to the previous link",
            "The first link"
          ],
          "answer": "Null"
        },
        {
          "question": "How can a doubly linked list be traversed?",
          "options": [
            "Only forward",
            "Only backward",
            "Both forward and backward",
            "It cannot be traversed"
          ],
          "answer": "Both forward and backward"
        },
        {
          "question": "What is the purpose of the `displayList()` method in a linked list?",
          "options": [
            "To find a specific link by its value",
            "To display all the links in the list",
            "To insert a new link",
            "To delete a link"
          ],
          "answer": "To display all the links in the list"
        },
        {
          "question": "In a linked list implementation, what does the `first` reference point to?",
          "options": [
            "The first link in the list",
            "The last link in the list",
            "The middle link in the list",
            "The node being searched"
          ],
          "answer": "The first link in the list"
        },
        {
          "question": "Which of the following is true about a circular linked list?",
          "options": [
            "It has no first or last link",
            "The last link points to the first link",
            "It has only one reference to the next link",
            "It is a doubly linked list"
          ],
          "answer": "The last link points to the first link"
        },
        {
          "question": "What is the method used to insert a new link at the beginning of a linked list?",
          "options": [
            "insertFirst()",
            "insertLast()",
            "addFirst()",
            "push()"
          ],
          "answer": "insertFirst()"
        },
        {
          "question": "What is the time complexity of inserting a new element at the beginning of a linked list?",
          "options": [
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n^2)"
          ],
          "answer": "O(1)"
        },
        {
          "question": "How do you delete the first element in a linked list?",
          "options": [
            "Change the `first` pointer to the second link",
            "Remove the `next` reference from the first link",
            "Shift all elements to the left",
            "Update the `last` pointer to null"
          ],
          "answer": "Change the `first` pointer to the second link"
        },
        {
          "question": "What is the time complexity of deleting an element from the middle of a linked list?",
          "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n^2)"
          ],
          "answer": "O(n)"
        },
        {
          "question": "What happens when a new link is inserted in the middle of a linked list?",
          "options": [
            "The new link is added at the beginning",
            "The `next` reference of the previous link is updated to point to the new link",
            "The list becomes unordered",
            "The `first` pointer is updated"
          ],
          "answer": "The `next` reference of the previous link is updated to point to the new link"
        },
        {
          "question": "Which of the following is true for a doubly linked list?",
          "options": [
            "It has only one reference per link",
            "It can be traversed in one direction only",
            "It stores references to both the previous and next links",
            "It does not have a head pointer"
          ],
          "answer": "It stores references to both the previous and next links"
        },
        {
          "question": "What happens when you try to delete from an empty linked list?",
          "options": [
            "It throws an error",
            "It returns null",
            "It does nothing",
            "It returns the first item"
          ],
          "answer": "It throws an error"
        },
        {
          "question": "Which method can be used to display the contents of a linked list?",
          "options": [
            "display()",
            "showList()",
            "displayList()",
            "printList()"
          ],
          "answer": "displayList()"
        }
      ]
    },
    {
      "title": "q7",
      "questions": [
        {
          "question": "What is the main characteristic of a tree data structure?",
          "options": [
            "It consists of nodes connected by edges",
            "It allows random access to elements",
            "It is a linear structure",
            "It requires elements to be accessed sequentially"
          ],
          "answer": "It consists of nodes connected by edges"
        },
        {
          "question": "What is the root of a tree?",
          "options": [
            "The first node to be removed",
            "The top-most node of the tree",
            "The node with the maximum value",
            "The node with the minimum value"
          ],
          "answer": "The top-most node of the tree"
        },
        {
          "question": "In a binary tree, what is the maximum number of children a node can have?",
          "options": [
            "0",
            "1",
            "2",
            "3"
          ],
          "answer": "2"
        },
        {
          "question": "What is a leaf node in a tree?",
          "options": [
            "A node with no children",
            "A node with only one child",
            "A node that is the root",
            "A node with two children"
          ],
          "answer": "A node with no children"
        },
        {
          "question": "What is a path in a tree?",
          "options": [
            "A sequence of nodes from the root to the leaf",
            "A sequence of nodes connected by edges",
            "A list of leaf nodes",
            "A list of parent-child pairs"
          ],
          "answer": "A sequence of nodes connected by edges"
        },
        {
          "question": "What is a subtree?",
          "options": [
            "A tree containing a node and all its descendants",
            "A tree without any nodes",
            "A tree with only the root node",
            "A tree that has no leaves"
          ],
          "answer": "A tree containing a node and all its descendants"
        },
        {
          "question": "In a binary search tree (BST), what condition must hold for every node?",
          "options": [
            "The left child must be greater than the parent",
            "The right child must be greater than the parent",
            "The left child must have a key greater than the parent, and the right child must have a key smaller",
            "The left child must have a key smaller than the parent, and the right child must have a key greater than the parent"
          ],
          "answer": "The left child must have a key smaller than the parent, and the right child must have a key greater than the parent"
        },
        {
          "question": "What is the primary operation used to search for an element in a binary search tree (BST)?",
          "options": [
            "Insert",
            "Delete",
            "Find",
            "Traverse"
          ],
          "answer": "Find"
        },
        {
          "question": "Which operation involves inserting a new node in a binary search tree?",
          "options": [
            "Find",
            "Insert",
            "Delete",
            "Traverse"
          ],
          "answer": "Insert"
        },
        {
          "question": "What is the time complexity of finding a node in a binary search tree (BST) in the worst case?",
          "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n^2)"
          ],
          "answer": "O(n)"
        },
        {
          "question": "What happens when a new node is inserted into a binary search tree?",
          "options": [
            "The tree is rebalanced",
            "The node is added to the root",
            "The new node is inserted as a leaf based on the value comparison",
            "The tree becomes unbalanced"
          ],
          "answer": "The new node is inserted as a leaf based on the value comparison"
        },
        {
          "question": "Which of the following tree traversal methods visits the root node first?",
          "options": [
            "Inorder",
            "Postorder",
            "Preorder",
            "Level order"
          ],
          "answer": "Preorder"
        },
        {
          "question": "Which of the following is a valid tree traversal method?",
          "options": [
            "Preorder",
            "Postorder",
            "Inorder",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "In the inorder traversal of a binary tree, the nodes are visited in which order?",
          "options": [
            "Left-Root-Right",
            "Root-Left-Right",
            "Left-Right-Root",
            "Right-Left-Root"
          ],
          "answer": "Left-Root-Right"
        },
        {
          "question": "In the postorder traversal of a binary tree, the nodes are visited in which order?",
          "options": [
            "Left-Root-Right",
            "Root-Left-Right",
            "Left-Right-Root",
            "Right-Left-Root"
          ],
          "answer": "Left-Right-Root"
        },
        {
          "question": "What is the time complexity of inserting an element into a balanced binary search tree (BST)?",
          "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n^2)"
          ],
          "answer": "O(log n)"
        },
        {
          "question": "What is the root node of a binary tree?",
          "options": [
            "The last node inserted",
            "The node with the maximum key value",
            "The top-most node in the tree",
            "The node with the minimum key value"
          ],
          "answer": "The top-most node in the tree"
        },
        {
          "question": "In a breadth-first traversal (BFS) of a tree, which node is visited first?",
          "options": [
            "The left-most node",
            "The root node",
            "The right-most node",
            "The leaf nodes"
          ],
          "answer": "The root node"
        },
        {
          "question": "What is the time complexity of a breadth-first search (BFS) in a binary tree?",
          "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n^2)"
          ],
          "answer": "O(n)"
        },
        {
          "question": "What type of binary tree traversal visits nodes in the order: Left, Root, Right?",
          "options": [
            "Preorder",
            "Postorder",
            "Inorder",
            "Level-order"
          ],
          "answer": "Inorder"
        },
        {
          "question": "What is the function of a binary search tree (BST)?",
          "options": [
            "To sort elements",
            "To find the maximum element",
            "To find the minimum element",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "What happens during the \"delete\" operation in a binary search tree?",
          "options": [
            "The node is removed, and its children are reconnected",
            "The node is deleted, and the tree is rebalanced",
            "The node is deleted, but the tree structure remains unchanged",
            "The tree is destroyed"
          ],
          "answer": "The node is removed, and its children are reconnected"
        },
        {
          "question": "What is the key characteristic of a balanced binary search tree?",
          "options": [
            "The left and right subtrees have an equal number of nodes",
            "The height of the left and right subtrees differs by at most one",
            "All leaf nodes are at the same level",
            "Each node has two children"
          ],
          "answer": "The height of the left and right subtrees differs by at most one"
        },
        {
          "question": "How are binary trees used in computer science?",
          "options": [
            "For sorting and searching data",
            "To implement priority queues",
            "For expression evaluation",
            "All of the above"
          ],
          "answer": "All of the above"
        },
        {
          "question": "What is the purpose of traversing a tree?",
          "options": [
            "To find a node",
            "To display all the nodes in the tree",
            "To check for a specific condition",
            "All of the above"
          ],
          "answer": "All of the above"
        }
      ]
    },
    {
      "title": "q8",
      "questions": [
        {
          "question": "Which traversal visits nodes in the order: Left-Root-Right?",
          "options": [
            "Preorder",
            "Postorder",
            "Inorder",
            "Level-order"
          ],
          "answer": "Inorder"
        },
        {
          "question": "What is the first step in preorder traversal of a binary tree?",
          "options": [
            "Visit the right child",
            "Visit the root node",
            "Visit the left child",
            "Traverse both subtrees"
          ],
          "answer": "Visit the root node"
        },
        {
          "question": "What is the main characteristic of postorder traversal?",
          "options": [
            "Left-Right-Root",
            "Root-Left-Right",
            "Left-Root-Right",
            "Root-Right-Left"
          ],
          "answer": "Left-Right-Root"
        },
        {
          "question": "What does the `find` method in a binary search tree (BST) do?",
          "options": [
            "Deletes a node",
            "Finds a node with a specified key",
            "Inserts a new node",
            "Traverses the tree"
          ],
          "answer": "Finds a node with a specified key"
        },
        {
          "question": "In the `insert` method of a binary search tree (BST), where is the new node inserted?",
          "options": [
            "At the root node",
            "As a left or right child based on comparisons",
            "At the top of the tree",
            "As a leaf node randomly"
          ],
          "answer": "As a left or right child based on comparisons"
        },
        {
          "question": "Which of the following is true when deleting a node with two children from a binary search tree?",
          "options": [
            "The node is removed, and the tree becomes unbalanced",
            "The node is replaced with its predecessor",
            "The node is removed, and its children are reconnected",
            "The node is deleted, and the tree is restructured"
          ],
          "answer": "The node is replaced with its predecessor"
        },
        {
          "question": "In the delete operation, if a node has no children, what happens?",
          "options": [
            "The node is deleted, and the tree is rebalanced",
            "The node is deleted, and no further changes are needed",
            "The node is moved to the root",
            "The node is merged with its parent"
          ],
          "answer": "The node is deleted, and no further changes are needed"
        },
        {
          "question": "What is the successor of a node in a binary search tree?",
          "options": [
            "The node with the next largest key",
            "The leftmost node in the tree",
            "The node with the smallest key",
            "The parent node"
          ],
          "answer": "The node with the next largest key"
        },
        {
          "question": "What is the height of a binary tree?",
          "options": [
            "The number of nodes in the tree",
            "The number of edges from the root to the deepest leaf",
            "The number of nodes from the root to the deepest leaf",
            "The largest number of children in any node"
          ],
          "answer": "The number of edges from the root to the deepest leaf"
        },
        {
          "question": "What is the degree of a node in a tree?",
          "options": [
            "The number of nodes in its subtree",
            "The number of edges connected to it",
            "The number of children it has",
            "The level of the node"
          ],
          "answer": "The number of children it has"
        },{
          "question": "A full binary tree of height h has how many nodes?",
          "options": [
            "2h",
            "2h+1",
            "2h-1",
            "2h+1-1"
          ],
          "answer": "2h+1-1"
        },
        {
          "question": "What is a complete binary tree?",
          "options": [
            "A tree where all nodes have two children",
            "A tree where each node is a leaf node",
            "A tree where each level is filled completely, except possibly the last",
            "A tree where all nodes have the same number of children"
          ],
          "answer": "A tree where each level is filled completely, except possibly the last"
        },
        {
          "question": "What is the time complexity of inserting an element into a binary search tree (BST)?",
          "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n^2)"
          ],
          "answer": "O(log n)"
        },
        {
          "question": "In a balanced binary tree, the difference in height between the left and right subtrees of any node should be:",
          "options": [
            "0",
            "1",
            "At most 2",
            "Less than 3"
          ],
          "answer": "1"
        },
        {
          "question": "What is the purpose of the inorder traversal in a binary search tree?",
          "options": [
            "To visit the nodes in a specific order (Left-Root-Right)",
            "To visit the nodes from the root to the leaf",
            "To visit the nodes in level-order",
            "To find the node with the largest key"
          ],
          "answer": "To visit the nodes in a specific order (Left-Root-Right)"
        },
        {
          "question": "In a binary search tree, what would the preorder traversal output be for the tree:  \n```\n       10  \n      /  \\  \n     5   15  \n        /  \\  \n       12  20  \n```",
          "options": [
            "10 5 15 12 20",
            "10 15 5 20 12",
            "15 10 5 12 20",
            "5 10 12 15 20"
          ],
          "answer": "10 5 15 12 20"
        },
        {
          "question": "What is the height of the binary search tree with 15 nodes?",
          "options": [
            "3",
            "4",
            "5",
            "6"
          ],
          "answer": "4"
        },
        {
          "question": "What is the term used for the number of edges on the longest path from the root to a leaf in a binary tree?",
          "options": [
            "Degree",
            "Depth",
            "Height",
            "Size"
          ],
          "answer": "Height"
        },
        {
          "question": "What happens when deleting a node in a binary search tree that has two children?",
          "options": [
            "The node is replaced with its left child",
            "The node is replaced with its right child",
            "The node is replaced with its successor or predecessor",
            "The node is just removed without replacement"
          ],
          "answer": "The node is replaced with its successor or predecessor"
        },
        {
          "question": "What is the successor of a node in a binary search tree?",
          "options": [
            "The smallest node in the right subtree",
            "The largest node in the left subtree",
            "The parent node",
            "The first node visited during inorder traversal"
          ],
          "answer": "The smallest node in the right subtree"
        },
        {
          "question": "Which of the following operations is performed during the insertion of a new node in a binary search tree?",
          "options": [
            "The new node becomes the root node",
            "The tree is restructured for balance",
            "The new node is placed at the correct position according to the key",
            "The tree is deleted and rebuilt"
          ],
          "answer": "The new node is placed at the correct position according to the key"
        },
        {
          "question": "What is the time complexity of finding a node in an unbalanced binary search tree?",
          "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n^2)"
          ],
          "answer": "O(n)"
        },
        {
          "question": "How is a complete binary tree different from a full binary tree?",
          "options": [
            "A full binary tree has all levels completely filled",
            "A complete binary tree can have missing nodes in the last level",
            "A complete binary tree is a special case of a full binary tree",
            "All nodes in a complete binary tree must be leaf nodes"
          ],
          "answer": "A complete binary tree can have missing nodes in the last level"
        },
        {
          "question": "Which method is used to remove the smallest node from a binary search tree?",
          "options": [
            "Delete node",
            "Find minimum",
            "Remove node",
            "Delete root"
          ],
          "answer": "Find minimum"
        },
        {
          "question": "What does the `delete` method in a binary search tree do?",
          "options": [
            "Finds the node and deletes it from the tree",
            "Only deletes the root node",
            "Replaces the node with its right child",
            "Deletes the right child of the node"
          ],
          "answer": "Finds the node and deletes it from the tree"
        }
      ]
    },
    {
      "title": "q9",
      "questions": [
        {
          "question": "Given a Binary Search Tree (BST), what will the following sequence of operations return for a tree:  \n- Insert(20)  \n- Insert(10)  \n- Insert(30)  \n- Find(10)",
          "options": [
            "20",
            "10",
            "30",
            "null"
          ],
          "answer": "10"
        },
        {
          "question": "If you perform an Inorder traversal of the following tree:  \n```  \n      50  \n     /  \\  \n    30   70  \n   /  \\   / \\  \n  20  40 60  80  \n```  \nWhat will be the output?",
          "options": [
            "50 30 70 20 40 60 80",
            "20 30 40 50 60 70 80",
            "50 20 30 40 70 60 80",
            "20 40 30 60 80 70 50"
          ],
          "answer": "20 30 40 50 60 70 80"
        },
        {
          "question": "Which traversal method of a binary tree visits the nodes in the order: Root-Left-Right?",
          "options": [
            "Inorder",
            "Preorder",
            "Postorder",
            "Level-order"
          ],
          "answer": "Preorder"
        },
        {
          "question": "When deleting a node in a BST that has two children, what is the typical approach to maintain the tree's integrity?",
          "options": [
            "Remove the node and leave the children",
            "Replace the node with its inorder successor",
            "Replace the node with its inorder predecessor",
            "Remove the node and re-structure the tree"
          ],
          "answer": "Replace the node with its inorder successor"
        },
        {
          "question": "What is the worst-case time complexity of finding an element in a binary search tree that is unbalanced (degenerates into a linked list)?",
          "options": [
            "O(log n)",
            "O(n)",
            "O(n log n)",
            "O(1)"
          ],
          "answer": "O(n)"
        },
        {
          "question": "What will happen if we try to insert a value that already exists in a Binary Search Tree (BST)?",
          "options": [
            "The value will be ignored",
            "The value will be inserted as a new node",
            "The value will replace the existing node",
            "It will cause a stack overflow error"
          ],
          "answer": "The value will be ignored"
        },
        {
          "question": "In a binary search tree, what is the time complexity of the insert operation in the worst case?",
          "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n log n)"
          ],
          "answer": "O(n)"
        },
        {
          "question": "Which of the following is the correct sequence of operations to delete a node with only one child in a binary search tree?",
          "options": [
            "Remove the node and re-balance the tree",
            "Remove the node, and replace it with its child",
            "Replace the node with its inorder predecessor",
            "Replace the node with its inorder successor"
          ],
          "answer": "Remove the node, and replace it with its child"
        },
        {
          "question": "In a balanced binary search tree, the height of the tree is defined as:",
          "options": [
            "The number of nodes",
            "The number of edges from the root to the deepest leaf",
            "The number of nodes from the root to the deepest leaf",
            "The total number of levels in the tree"
          ],
          "answer": "The number of edges from the root to the deepest leaf"
        },
        {
          "question": "Consider a binary tree with the following structure:  \n```  \n      10  \n     /  \\  \n    5    15  \n   / \\   / \\  \n  3   7 12  20  \n```  \nWhat will the preorder traversal output be?",
          "options": [
            "10 5 3 7 15 12 20",
            "10 5 3 7 15 20 12",
            "5 10 7 3 15 12 20",
            "15 10 5 3 7 12 20"
          ],
          "answer": "10 5 3 7 15 12 20"
        },
        {
          "question": "How would you find the minimum value node in a Binary Search Tree (BST)?",
          "options": [
            "Traverse the rightmost path",
            "Traverse the leftmost path",
            "The root node is always the minimum",
            "The minimum value node is the left child of the root"
          ],
          "answer": "Traverse the leftmost path"
        },
        {
          "question": "If a binary tree is full, how many nodes will it contain at height h?",
          "options": [
            "2^h",
            "2^(h+1) - 1",
            "2h",
            "h^2"
          ],
          "answer": "2^(h+1) - 1"
        },
        {
          "question": "What is the worst-case time complexity of deleting a node in a balanced binary search tree (BST)?",
          "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n log n)"
          ],
          "answer": "O(log n)"
        },
        {
          "question": "When performing a level-order traversal, which data structure is typically used to store nodes?",
          "options": [
            "Stack",
            "Queue",
            "Linked list",
            "Array"
          ],
          "answer": "Queue"
        },
        {
          "question": "Which of the following statements is true about a binary search tree (BST)?",
          "options": [
            "The left child's key is greater than the parent's key",
            "The right child's key is smaller than the parent's key",
            "The left child's key is smaller than the parent's key, and the right child's key is greater",
            "There are no restrictions on the keys in a BST"
          ],
          "answer": "The left child's key is smaller than the parent's key, and the right child's key is greater"
        },
        {
          "question": "What happens during an inorder traversal of a binary search tree?",
          "options": [
            "The nodes are visited in ascending order of their keys",
            "The root is visited before the left and right subtrees",
            "The nodes are visited in a level-wise manner",
            "The root is visited after the left and right subtrees"
          ],
          "answer": "The nodes are visited in ascending order of their keys"
        },
        {
          "question": "What is the correct sequence for postorder traversal?",
          "options": [
            "Left-Root-Right",
            "Root-Left-Right",
            "Left-Right-Root",
            "Root-Right-Left"
          ],
          "answer": "Left-Right-Root"
        },
        {
          "question": "If a binary tree is complete, how is the last level filled?",
          "options": [
            "From left to right",
            "From right to left",
            "The last level is always empty",
            "The last level is filled randomly"
          ],
          "answer": "From left to right"
        },
        {
          "question": "What is the space complexity of storing a binary search tree with n nodes?",
          "options": [
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n^2)"
          ],
          "answer": "O(n)"
        },
        {
          "question": "What type of binary tree guarantees that the tree is as balanced as possible?",
          "options": [
            "Full binary tree",
            "Complete binary tree",
            "Perfect binary tree",
            "Balanced binary search tree"
          ],
          "answer": "Balanced binary search tree"
        },
        {
          "question": "Which method would you use to visit every node in a tree starting from the root?",
          "options": [
            "Traversal",
            "Deletion",
            "Insertion",
            "Search"
          ],
          "answer": "Traversal"
        },
        {
          "question": "How do you delete the root node in a binary search tree?",
          "options": [
            "Replace it with its right child",
            "Replace it with its left child",
            "Replace it with its successor or predecessor",
            "Delete it without replacement"
          ],
          "answer": "Replace it with its successor or predecessor"
        },
        {
          "question": "In a binary search tree, if the node to be deleted has two children, which node is typically chosen as the replacement?",
          "options": [
            "The parent node",
            "The leftmost child in the right subtree",
            "The rightmost child in the left subtree",
            "The root node"
          ],
          "answer": "The leftmost child in the right subtree"
        },
        {
          "question": "What is the successor of a node in a binary search tree?",
          "options": [
            "The node with the highest key value in the tree",
            "The node with the smallest key value in the tree",
            "The node with the next highest key",
            "The leftmost node in the tree"
          ],
          "answer": "The node with the next highest key"
        },
        {
          "question": "What is the time complexity of deleting a node from an unbalanced binary search tree?",
          "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n^2)"
          ],
          "answer": "O(n)"
        }
      ]
    }
  ]
};l


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