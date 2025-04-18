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
            "question": "What is the main advantage of using the Object-Oriented Programming (OOP) paradigm?",
            "options": [
              "Faster execution time",
              "Reusability and modularity",
              "Better memory management",
              "Simplified code debugging"
            ],
            "answer": "Reusability and modularity"
          },
          {
            "question": "What does the keyword 'extends' signify in Java?",
            "options": [
              "Creating a new class",
              "Inheritance between classes",
              "Overriding methods",
              "Accessing superclass methods"
            ],
            "answer": "Inheritance between classes"
          },
          {
            "question": "Which OOP principle is implemented using private fields and getter/setter methods?",
            "options": [
              "Abstraction",
              "Encapsulation",
              "Polymorphism",
              "Inheritance"
            ],
            "answer": "Encapsulation"
          },
          {
            "question": "What does 'method overloading' refer to in Java?",
            "options": [
              "Two methods with the same name and parameters",
              "Two methods with the same name but different parameters",
              "Changing the method's return type",
              "Replacing one method's behavior with another"
            ],
            "answer": "Two methods with the same name but different parameters"
          },
          {
            "question": "Which type of relationship does inheritance represent in OOP?",
            "options": [
              "Has-a",
              "Is-a",
              "Has-a or Is-a",
              "Is-a or Can-do"
            ],
            "answer": "Is-a"
          },
          {
            "question": "In Java, which keyword is used to call the constructor of the parent class?",
            "options": [
              "super()",
              "this()",
              "parent()",
              "extends()"
            ],
            "answer": "super()"
          },
          {
            "question": "What is polymorphism in OOP?",
            "options": [
              "The ability to create multiple objects of a class",
              "The ability of one class to inherit from another",
              "The ability to define multiple methods with the same name but different implementations",
              "The ability to hide the internal workings of an object"
            ],
            "answer": "The ability to define multiple methods with the same name but different implementations"
          },
          {
            "question": "What is the purpose of a constructor in Java?",
            "options": [
              "To initialize object fields",
              "To create an object instance",
              "To destroy an object",
              "To display object details"
            ],
            "answer": "To initialize object fields"
          },
          {
            "question": "Which method is called when an object is instantiated in Java?",
            "options": [
              "getter",
              "setter",
              "constructor",
              "destructor"
            ],
            "answer": "constructor"
          },
          {
            "question": "Which of the following is NOT a relationship in OOP?",
            "options": [
              "Inheritance",
              "Aggregation",
              "Polymorphism",
              "Encapsulation"
            ],
            "answer": "Polymorphism"
          },
          {
            "question": "What does the 'private' access modifier in Java imply?",
            "options": [
              "The method can be accessed by any other class",
              "The method is accessible within its own class only",
              "The method can only be accessed within the package",
              "The method can be accessed by subclasses"
            ],
            "answer": "The method is accessible within its own class only"
          },
          {
            "question": "What is the main difference between composition and aggregation in Java?",
            "options": [
              "In composition, objects cannot exist independently; in aggregation, they can.",
              "In aggregation, objects cannot exist independently; in composition, they can.",
              "Both relationships are identical in behavior.",
              "Composition refers to inheritance, while aggregation refers to method binding."
            ],
            "answer": "In composition, objects cannot exist independently; in aggregation, they can."
          },
          {
            "question": "Which of the following is an example of a class-level variable?",
            "options": [
              "Instance variable",
              "Static variable",
              "Local variable",
              "Method variable"
            ],
            "answer": "Static variable"
          },
          {
            "question": "Which of the following is NOT a feature of an abstract class?",
            "options": [
              "It cannot be instantiated.",
              "It can have both abstract and non-abstract methods.",
              "It can have final methods.",
              "It must have a constructor."
            ],
            "answer": "It must have a constructor."
          },
          {
            "question": "Which method must be implemented by any class that implements an interface in Java?",
            "options": [
              "Any method defined within the class",
              "Methods defined in the interface",
              "The constructor of the class",
              "The toString() method"
            ],
            "answer": "Methods defined in the interface"
          },
          {
            "question": "What is a default constructor in Java?",
            "options": [
              "A constructor with no parameters",
              "A constructor that can be overridden",
              "A constructor that initializes all fields to default values",
              "A constructor that takes parameters"
            ],
            "answer": "A constructor with no parameters"
          },
          {
            "question": "What does 'super' keyword refer to in a subclass constructor?",
            "options": [
              "The superclass constructor",
              "The instance of the subclass",
              "The instance of the superclass",
              "The current class constructor"
            ],
            "answer": "The superclass constructor"
          },
          {
            "question": "Which of the following concepts is associated with 'method overriding'?",
            "options": [
              "Runtime polymorphism",
              "Compile-time polymorphism",
              "Both compile-time and runtime polymorphism",
              "Code reuse"
            ],
            "answer": "Runtime polymorphism"
          },
          {
            "question": "What is the correct way to define a getter method for a private field 'name'?",
            "options": [
              "public String getName() { return name; }",
              "private String getName() { return name; }",
              "public void setName(String name) { this.name = name; }",
              "public String setName() { return name; }"
            ],
            "answer": "public String getName() { return name; }"
          },
          {
            "question": "What is a key characteristic of a static method in Java?",
            "options": [
              "It can access instance variables",
              "It can be called without creating an object",
              "It can access private variables",
              "It cannot be overridden"
            ],
            "answer": "It can be called without creating an object"
          },
          {
            "question": "Which keyword is used to create a subclass in Java?",
            "options": [
              "extends",
              "implements",
              "super",
              "final"
            ],
            "answer": "extends"
          },
          {
            "question": "Which of the following is an example of abstraction?",
            "options": [
              "Creating a method that hides implementation details",
              "Creating a class with only instance variables",
              "Creating an instance of a class",
              "Creating an object that does not belong to any class"
            ],
            "answer": "Creating a method that hides implementation details"
          },
          {
            "question": "What is the purpose of an interface in Java?",
            "options": [
              "To define a contract for classes to implement",
              "To create a base class",
              "To manage memory allocation",
              "To handle exceptions"
            ],
            "answer": "To define a contract for classes to implement"
          },
          {
            "question": "Which of the following is an example of method overloading?",
            "options": [
              "public void add(int a, int b) {} public void add(double a, double b) {}",
              "public void add() {} public void add(int a, int b) {}",
              "public void add() {} public void subtract() {}",
              "public void add(int a) {} public void add(int b) {}"
            ],
            "answer": "public void add(int a, int b) {} public void add(double a, double b) {}"
          },
          {
            "question": "What type of method can be defined in an interface?",
            "options": [
              "Abstract method",
              "Static method",
              "Private method",
              "Constructors"
            ],
            "answer": "Abstract method"
          },
          {
            "question": "What is the primary difference between an abstract class and an interface?",
            "options": [
              "An abstract class can implement methods, an interface cannot.",
              "An abstract class can have both abstract and concrete methods, an interface can only have abstract methods.",
              "An interface cannot be inherited, but an abstract class can.",
              "An abstract class can have constructors, an interface cannot."
            ],
            "answer": "An abstract class can have both abstract and concrete methods, an interface can only have abstract methods."
          },
          {
            "question": "Which of the following is true about interfaces in Java?",
            "options": [
              "An interface can extend multiple classes",
              "An interface can implement multiple classes",
              "An interface can extend another interface",
              "An interface can contain instance variables"
            ],
            "answer": "An interface can extend another interface"
          },
          {
            "question": "What is the key feature of polymorphism in OOP?",
            "options": [
              "The ability to perform the same operation in different ways",
              "The ability to hide data from the user",
              "The ability to combine two classes",
              "The ability to create objects dynamically"
            ],
            "answer": "The ability to perform the same operation in different ways"
          },
          {
            "question": "Which keyword is used to prevent a method from being overridden in Java?",
            "options": [
              "final",
              "static",
              "public",
              "protected"
            ],
            "answer": "final"
          },
          {
            "question": "What does the 'this' keyword refer to in Java?",
            "options": [
              "The current object instance",
              "The superclass object",
              "The constructor of the class",
              "The method being called"
            ],
            "answer": "The current object instance"
          },
          {
            "question": "What is method overriding used for in Java?",
            "options": [
              "To provide a new implementation of a method in a subclass",
              "To define a method with the same signature in the subclass",
              "To overload a method in the subclass",
              "To ensure method execution in the superclass"
            ],
            "answer": "To provide a new implementation of a method in a subclass"
          }
        ]
      },
  
      {
        "title": "q2",
        "questions": [
          {
            "question": "What relationship is demonstrated between the University and Student classes in the following code?\n\n public class University {\n  private ArrayList<Student> students;\n\n  public University() {\n    students = new ArrayList<Student>();\n  }\n\n  public void addStudent(Student student) {\n    students.add(student);\n  }\n}",
            "options": [
              "Inheritance",
              "Aggregation",
              "Composition",
              "Association",
              "Dependency"
            ],
            "answer": "Aggregation"
          },
          {
            "question": "What relationship is demonstrated between the House and Room classes in the following code?\n\n public class House {\n  private Room[] rooms;\n\n  public House() {\n    rooms = new Room[5];\n    for (int i = 0; i < 5; i++) {\n      rooms[i] = new Room();\n    }\n  }\n}",
            "options": [
              "Inheritance",
              "Aggregation",
              "Composition",
              "Association",
              "Dependency"
            ],
            "answer": "Composition"
          },
          {
            "question": "Which of the following statements about constructors in Java is incorrect?",
            "options": [
              "Constructors have the same name as the class",
              "Constructors can be overloaded",
              "Constructors can return a value of type void",
              "Constructors are called when an object is created",
              "If no constructor is defined, Java provides a default one"
            ],
            "answer": "Constructors can return a value of type void"
          },
          {
            "question": "What is the correct structure for a getter method for a private String name attribute in Java?",
            "options": [
              "public void getName() { return name; }",
              "private String getName() { return name; }",
              "public String getName() { return name; }",
              "String getName() { return this.name; }",
              "public name getName() { return this.name; }"
            ],
            "answer": "public String getName() { return name; }"
          },
          {
            "question": "Which OOP concept is demonstrated in the following code?\n\n public abstract class Shape {\n  public abstract double calculateArea();\n}",
            "options": [
              "Encapsulation",
              "Inheritance",
              "Polymorphism",
              "Abstraction",
              "Composition"
            ],
            "answer": "Abstraction"
          },
          {
            "question": "What is the output of the following code?\n\n public class Main {\n  public static void main(String[] args) {\n    Vehicle v = new Car();\n    v.drive();\n  }\n}\n\nclass Vehicle {\n  public void drive() {\n    System.out.println(\"Vehicle is driving\");\n  }\n}\n\nclass Car extends Vehicle {\n  public void drive() {\n    System.out.println(\"Car is driving\");\n  }\n}",
            "options": [
              "Vehicle is driving",
              "Car is driving",
              "Both Vehicle is driving and Car is driving",
              "Compilation error",
              "No output"
            ],
            "answer": "Car is driving"
          },
          {
            "question": "What will be the result of trying to compile and run the following code?\n\n public class Main {\n  public static void main(String[] args) {\n    Shape shape = new Shape();\n    shape.draw();\n  }\n}\n\nabstract class Shape {\n  public abstract void draw();\n}",
            "options": [
              "The code will compile and run without errors",
              "The code will compile but throw a runtime exception",
              "The code will not compile because abstract methods cannot have a body",
              "The code will not compile because abstract classes cannot be instantiated",
              "The code will not compile because the draw method is not implemented"
            ],
            "answer": "The code will not compile because abstract classes cannot be instantiated"
          },
          {
            "question": "Which of the following is an example of method overriding?",
            "options": [
              "Two methods with the same name but different parameters in the same class",
              "Two methods with the same name and parameters in the same class",
              "A method in a subclass with the same name and parameters as a method in its superclass",
              "A method with the same name in an unrelated class",
              "A method that takes variable number of arguments"
            ],
            "answer": "A method in a subclass with the same name and parameters as a method in its superclass"
          },
          {
            "question": "What will be the output of the following code?\n\n public class Main {\n  public static void main(String[] args) {\n    Person p = new Person();\n    System.out.println(p.name);\n  }\n}\n\nclass Person {\n  String name;\n  \n  public Person() {\n    this(\"John Doe\");\n  }\n  \n  public Person(String name) {\n    this.name = name;\n  }\n}",
            "options": [
              "null",
              "John Doe",
              "\"\"",
              "Compilation error",
              "Runtime exception"
            ],
            "answer": "John Doe"
          },
          {
            "question": "What is the correct way to implement constructor chaining in Java?",
            "options": [
              "Using the super() keyword to call the parent constructor",
              "Using the this() keyword to call another constructor in the same class",
              "Using the new keyword to create a new instance",
              "Using the return keyword to return from the current constructor",
              "Using the construct() method to call another constructor"
            ],
            "answer": "Using the this() keyword to call another constructor in the same class"
          },
          {
            "question": "Which of the following correctly describes the 'static' modifier in Java?",
            "options": [
              "Static methods can access instance variables directly",
              "Static variables belong to the class, not to instances",
              "Static methods can be overridden in subclasses",
              "Static variables are automatically initialized to null",
              "Static blocks are executed when an object is created"
            ],
            "answer": "Static variables belong to the class, not to instances"
          },
          {
            "question": "Which of the following statements about interfaces in Java is true?",
            "options": [
              "Interfaces can contain implemented methods (before Java 8)",
              "A class can implement multiple interfaces",
              "Interfaces can contain instance variables",
              "Interfaces can be instantiated directly",
              "Interfaces can extend multiple classes"
            ],
            "answer": "A class can implement multiple interfaces"
          },
          {
            "question": "What relationship is demonstrated between the Employee and Department classes in the following code?\n\n public class Employee {\n  private Department department;\n  \n  public Employee(Department department) {\n    this.department = department;\n  }\n}",
            "options": [
              "Inheritance",
              "Aggregation",
              "Composition",
              "Generalization",
              "Implementation"
            ],
            "answer": "Aggregation"
          },
          {
            "question": "Which of the following correctly describes the principle of encapsulation?",
            "options": [
              "The ability to hide implementation details of an object",
              "The ability to create multiple objects from a class",
              "The ability to inherit properties from a parent class",
              "The ability to override methods from a parent class",
              "The ability to create classes that can't be instantiated"
            ],
            "answer": "The ability to hide implementation details of an object"
          },
          {
            "question": "What is the main difference between method overloading and method overriding?",
            "options": [
              "Overloading occurs in the same class, overriding occurs in subclasses",
              "Overloading involves changing the method name, overriding keeps the same name",
              "Overloading is a compile-time concept, overriding is a runtime concept",
              "Overloading requires inheritance, overriding does not",
              "Overloading works with static methods, overriding does not"
            ],
            "answer": "Overloading is a compile-time concept, overriding is a runtime concept"
          },
          {
            "question": "Which of the following code demonstrates the concept of polymorphism?\n\n public class Main {\n  public static void main(String[] args) {\n    Shape shape1 = new Circle();\n    Shape shape2 = new Rectangle();\n    shape1.draw();\n    shape2.draw();\n  }\n}",
            "options": [
              "Method overloading",
              "Method overriding",
              "Dynamic method dispatch",
              "Constructor chaining",
              "Method hiding"
            ],
            "answer": "Dynamic method dispatch"
          },
          {
            "question": "What is the output of the following code?\n\n public class Main {\n  public static void main(String[] args) {\n    Animal animal = new Dog();\n    animal.makeSound();\n  }\n}\n\nclass Animal {\n  public void makeSound() {\n    System.out.println(\"Animal makes a sound\");\n  }\n}\n\nclass Dog extends Animal {\n  public void makeSound() {\n    super.makeSound();\n    System.out.println(\"Dog barks\");\n  }\n}",
            "options": [
              "Animal makes a sound",
              "Dog barks",
              "Animal makes a sound\nDog barks",
              "Compilation error",
              "No output"
            ],
            "answer": "Animal makes a sound\nDog barks"
          },
          {
            "question": "What is the difference between composition and aggregation in OOP?",
            "options": [
              "In composition, the parts can exist independently of the whole; in aggregation, they cannot",
              "In composition, the whole controls the lifecycle of its parts; in aggregation, it does not",
              "Composition requires inheritance; aggregation does not",
              "Composition is implemented using interfaces; aggregation is implemented using abstract classes",
              "There is no difference between composition and aggregation"
            ],
            "answer": "In composition, the whole controls the lifecycle of its parts; in aggregation, it does not"
          },
          {
            "question": "What does the following code demonstrate?\n\n public class Main {\n  public static void main(String[] args) {\n    Calculator calc = new Calculator();\n    System.out.println(calc.add(5, 3));\n    System.out.println(calc.add(5.2, 3.8));\n  }\n}\n\nclass Calculator {\n  public int add(int a, int b) {\n    return a + b;\n  }\n  \n  public double add(double a, double b) {\n    return a + b;\n  }\n}",
            "options": [
              "Method overriding",
              "Method overloading",
              "Method hiding",
              "Constructor chaining",
              "Dynamic dispatch"
            ],
            "answer": "Method overloading"
          },
          {
            "question": "Which type of relationship in OOP represents an 'is-a' relationship?",
            "options": [
              "Association",
              "Aggregation",
              "Composition",
              "Inheritance",
              "Dependency"
            ],
            "answer": "Inheritance"
          },
          {
            "question": "What is the output of the following code?\n\n public class Main {\n  public static void main(String[] args) {\n    Parent p = new Child();\n    p.display();\n  }\n}\n\nclass Parent {\n  public static void display() {\n    System.out.println(\"Display from Parent\");\n  }\n}\n\nclass Child extends Parent {\n  public static void display() {\n    System.out.println(\"Display from Child\");\n  }\n}",
            "options": [
              "Display from Parent",
              "Display from Child",
              "Compilation error",
              "Both Display from Parent and Display from Child",
              "No output"
            ],
            "answer": "Display from Parent"
          },
          {
            "question": "Which of the following is NOT a valid access modifier in Java?",
            "options": [
              "public",
              "private",
              "protected",
              "default",
              "friendly"
            ],
            "answer": "friendly"
          },
          {
            "question": "Which of the following statements about abstract classes in Java is true?",
            "options": [
              "Abstract classes can be instantiated directly",
              "Abstract classes can contain both abstract and non-abstract methods",
              "A class can extend multiple abstract classes",
              "Abstract methods must have a body",
              "All methods in an abstract class must be abstract"
            ],
            "answer": "Abstract classes can contain both abstract and non-abstract methods"
          },
          {
            "question": "What will be the output of the following code?\n\n public class Main {\n  public static void main(String[] args) {\n    Counter c = new Counter();\n    Counter.increment();\n    Counter.increment();\n    System.out.println(Counter.count);\n  }\n}\n\nclass Counter {\n  public static int count = 0;\n  \n  public static void increment() {\n    count++;\n  }\n}",
            "options": [
              "0",
              "1",
              "2",
              "Compilation error",
              "Runtime exception"
            ],
            "answer": "2"
          },
          {
            "question": "Which code segment correctly demonstrates dependency relationship in Java?\n\n public class Car {\n  public void drive(Driver driver) {\n    driver.drive();\n    System.out.println(\"Car is being driven\");\n  }\n}",
            "options": [
              "Inheritance",
              "Association",
              "Aggregation",
              "Composition",
              "Dependency"
            ],
            "answer": "Dependency"
          }
        ]
      },
  
      {
        "title": "q3",
        "questions": [
          {
            "question": "What relationship is demonstrated between the Library and Book classes in the following code?\n\n public class Library {\n  private ArrayList<Book> books;\n\n  public Library() {\n    books = new ArrayList<Book>();\n  }\n\n  public void addBook(Book book) {\n    books.add(book);\n  }\n}",
            "options": [
              "Inheritance",
              "Aggregation",
              "Composition",
              "Association",
              "Dependency"
            ],
            "answer": "Aggregation"
          },
          {
            "question": "What relationship is demonstrated between the Car and Engine classes in the following code?\n\n public class Car {\n  private Engine engine;\n\n  public Car() {\n    engine = new Engine();\n  }\n}",
            "options": [
              "Inheritance",
              "Aggregation",
              "Composition",
              "Association",
              "Dependency"
            ],
            "answer": "Composition"
          },
          {
            "question": "Which OOP concept is demonstrated in the following code?\n\n public abstract class Animal {\n  public abstract void sound();\n}",
            "options": [
              "Encapsulation",
              "Inheritance",
              "Polymorphism",
              "Abstraction",
              "Composition"
            ],
            "answer": "Abstraction"
          },
          {
            "question": "What will be the result of compiling and running the following code?\n\n public class Main {\n  public static void main(String[] args) {\n    Vehicle v = new Vehicle();\n    v.start();\n  }\n}\n\nclass Vehicle {\n  public void start() {\n    System.out.println(\"Vehicle is starting\");\n  }\n}",
            "options": [
              "Vehicle is starting",
              "Compilation error",
              "Runtime exception",
              "No output",
              "Vehicle is starting Vehicle is starting"
            ],
            "answer": "Vehicle is starting"
          },
          {
            "question": "What will be the output of the following code?\n\n public class Main {\n  public static void main(String[] args) {\n    Animal animal = new Dog();\n    animal.makeSound();\n  }\n}\n\nclass Animal {\n  public void makeSound() {\n    System.out.println(\"Animal makes sound\");\n  }\n}\n\nclass Dog extends Animal {\n  public void makeSound() {\n    System.out.println(\"Dog barks\");\n  }\n}",
            "options": [
              "Animal makes sound",
              "Dog barks",
              "Animal makes sound Dog barks",
              "Compilation error",
              "No output"
            ],
            "answer": "Dog barks"
          },
          {
            "question": "What is the correct way to define a constructor in Java?",
            "options": [
              "public void Car() { }",
              "private Car() { }",
              "public Car() { }",
              "public Car { }",
              "void Car() { }"
            ],
            "answer": "public Car() { }"
          },
          {
            "question": "What will be the output of the following code?\n\n public class Main {\n  public static void main(String[] args) {\n    Person p = new Person();\n    System.out.println(p.name);\n  }\n}\n\nclass Person {\n  String name;\n  \n  public Person() {\n    this(\"Alice\");\n  }\n  \n  public Person(String name) {\n    this.name = name;\n  }\n}",
            "options": [
              "null",
              "Alice",
              "\"\"",
              "Compilation error",
              "Runtime exception"
            ],
            "answer": "Alice"
          },
          {
            "question": "What is the output of the following code?\n\n public class Main {\n  public static void main(String[] args) {\n    Circle circle = new Circle();\n    System.out.println(circle.area());\n  }\n}\n\nclass Shape {\n  public double area() { return 0; }\n}\n\nclass Circle extends Shape {\n  public double area() { return 3.14 * 5 * 5; }\n}",
            "options": [
              "0",
              "78.5",
              "Error",
              "3.14",
              "15.7"
            ],
            "answer": "78.5"
          },
          {
            "question": "What does the following code demonstrate?\n\n public class Main {\n  public static void main(String[] args) {\n    Car car = new Car();\n    car.accelerate();\n  }\n}\n\nclass Vehicle {\n  public void accelerate() {\n    System.out.println(\"Vehicle is accelerating\");\n  }\n}\n\nclass Car extends Vehicle {\n  public void accelerate() {\n    System.out.println(\"Car is accelerating\");\n  }\n}",
            "options": [
              "Method overloading",
              "Method overriding",
              "Polymorphism",
              "Constructor chaining",
              "Method hiding"
            ],
            "answer": "Method overriding"
          },
          {
            "question": "What will be the output of the following code?\n\n public class Main {\n  public static void main(String[] args) {\n    Animal animal = new Dog();\n    animal.sound();\n  }\n}\n\nabstract class Animal {\n  abstract void sound();\n}\n\nclass Dog extends Animal {\n  void sound() {\n    System.out.println(\"Bark\");\n  }\n}",
            "options": [
              "Bark",
              "Compilation error",
              "No output",
              "Animal makes a sound",
              "Runtime exception"
            ],
            "answer": "Bark"
          },
          {
            "question": "What relationship is demonstrated between the Manager and Employee classes in the following code?\n\n public class Manager {\n  private Employee employee;\n\n  public Manager(Employee employee) {\n    this.employee = employee;\n  }\n}",
            "options": [
              "Inheritance",
              "Aggregation",
              "Composition",
              "Generalization",
              "Implementation"
            ],
            "answer": "Aggregation"
          },
          {
            "question": "What is the output of the following code?\n\n public class Main {\n  public static void main(String[] args) {\n    Employee emp = new Employee();\n    emp.showDetails();\n  }\n}\n\nclass Employee {\n  String name = \"John\";\n  int age = 30;\n\n  public void showDetails() {\n    System.out.println(name + \" is \" + age + \" years old.\");\n  }\n}",
            "options": [
              "John is 30 years old.",
              "Compilation error",
              "John is 0 years old.",
              "No output",
              "Runtime error"
            ],
            "answer": "John is 30 years old."
          },
          {
            "question": "What is the correct syntax for method overloading in Java?",
            "options": [
              "A. public void add(int a, int b) { } public void add(double a, double b) { }",
              "B. public void add(int a, int b) { } public void add(int a, double b) { }",
              "C. public void add() { } public void add(int a, int b) { }",
              "D. public void add() { } public void subtract() { }",
              "E. public void add(int a) { } public void add(int b) { }"
            ],
            "answer": "A. public void add(int a, int b) { } public void add(double a, double b) { }"
          },
          {
            "question": "What relationship is demonstrated between the Professor and Course classes in the following code?\n\n public class Professor {\n  private Course course;\n\n  public Professor(Course course) {\n    this.course = course;\n  }\n}",
            "options": [
              "Inheritance",
              "Aggregation",
              "Composition",
              "Generalization",
              "Implementation"
            ],
            "answer": "Aggregation"
          },
          {
            "question": "Which of the following statements about abstract methods in Java is true?",
            "options": [
              "A. Abstract methods must have a body.",
              "B. Abstract methods are optional in abstract classes.",
              "C. Abstract methods must be implemented in non-abstract classes.",
              "D. Abstract methods can be called directly.",
              "E. Abstract methods can only exist in interfaces."
            ],
            "answer": "C. Abstract methods must be implemented in non-abstract classes."
          },
          {
            "question": "What will be the output of the following code?\n\n public class Main {\n  public static void main(String[] args) {\n    Circle circle = new Circle();\n    System.out.println(circle.area());\n  }\n}\n\nclass Circle {\n  public double area() {\n    return 3.14 * 5 * 5;\n  }\n}",
            "options": [
              "3.14",
              "78.5",
              "15.7",
              "Error",
              "No output"
            ],
            "answer": "78.5"
          },
          {
            "question": "Which OOP concept is demonstrated in the following code?\n\n public interface Animal {\n  void sound();\n}",
            "options": [
              "Inheritance",
              "Polymorphism",
              "Abstraction",
              "Encapsulation",
              "Composition"
            ],
            "answer": "Abstraction"
          },
          {
            "question": "What is the output of the following code?\n\n public class Main {\n  public static void main(String[] args) {\n    Car car = new Car();\n    car.accelerate();\n  }\n}\n\nclass Vehicle {\n  public void accelerate() {\n    System.out.println(\"Vehicle is accelerating\");\n  }\n}\n\nclass Car extends Vehicle {\n  public void accelerate() {\n    System.out.println(\"Car is accelerating\");\n  }\n}",
            "options": [
              "Vehicle is accelerating",
              "Car is accelerating",
              "Vehicle is accelerating Car is accelerating",
              "No output",
              "Compilation error"
            ],
            "answer": "Car is accelerating"
          },
          {
            "question": "What will be the output of the following code?\n\n  public static void main(String[] args) {\n    Vehicle vehicle = new Car();\n    vehicle.accelerate();\n  }\n}\n\nclass Vehicle {\n  public void accelerate() {\n    System.out.println(\"Vehicle is accelerating\");\n  }\n}\n\nclass Car extends Vehicle {\n  public void accelerate() {\n    super.accelerate();\n    System.out.println(\"Car is accelerating\");\n  }\n}",
            "options": [
              "Vehicle is accelerating",
              "Car is accelerating",
              "Vehicle is accelerating Car is accelerating",
              "No output",
              "Compilation error"
            ],
            "answer": "Vehicle is accelerating Car is accelerating"
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