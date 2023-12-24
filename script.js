
const array = [];
const quicksortSwaps = [];
const insertionSortSwaps = [];

var slider = document.getElementById("bar_num_slider");
var numElements = slider.value;
    // Attach an event listener to detect changes in the slider value
    slider.addEventListener("input", function() {
        // Retrieve the current value of the slider
         numElements = slider.value;
        
         randomize();
        // Use the slider value as needed
    });

    var delaySlider = document.getElementById("delay_slider");
    var delay = delaySlider.value;
    // Attach an event listener to detect changes in the slider value
    delaySlider.addEventListener("input", function() {
        // Retrieve the current value of the slider
         delay = delaySlider.value;    
    });
randomize();
function randomize() {
    for(let i = 0; i < numElements; i++) {
        array[i] = Math.random();
    }
    
    showBars();
}

var buttons = document.querySelectorAll(".arrayButtons");

// Function to disable all buttons with the class "myButton"


function insertionSortHolder(arr) {
    const myParagraph = document.getElementById("sortingInfo");
myParagraph.textContent = "Insertion Sort is another straightforward sorting algorithm that builds the final sorted list one item at a time. It is much less efficient on large lists compared to more advanced algorithms but performs well for small datasets. The algorithm takes each element from the unsorted portion and inserts it into its correct position within the sorted region. The time complexity of Insertion Sort is also O(n^2).";
    disableButtons();
    const copy=[...arr];
    insertionSort(copy);
    animate(insertionSortSwaps);
}
function insertionSort(arr) {
    disableButtons();
    for (let i = 1; i < numElements; i++) {
      let currentValue = arr[i];
      let j;
      for (j = i - 1; j >= 0 && arr[j] > currentValue; j--) {
        
        arr[j + 1] = arr[j];
        insertionSortSwaps.push([j+1,j]);
      }
      arr[j + 1] = currentValue;
    }
    
    return arr;
  }
  
function disableButtons() {
    document.querySelectorAll('button.arrayButtons').forEach(elem => {
        elem.disabled = true;
    });
    document.getElementById("bar_num_slider").disabled = true;
}
function enableButtons() {
    document.querySelectorAll('button.arrayButtons').forEach(elem => {
        elem.disabled = false;
        document.getElementById("bar_num_slider").disabled = false;

    });
}
function sort(SortingFunction){
    disableButtons();
    const copy=[...array];
    //  4  **save them in variable(likley wont need to be repeated)
    const swaps = SortingFunction(copy);
    animate(swaps);
}

function animate(swaps) {
    if(swaps.length == 0) {
        showBars();
        enableButtons()
        return;
    }
    
    const [i,j] = swaps.shift();
    [array[i],array[j]] = [array[j],array[i]];
    showBars([i,j]);
    setTimeout(function(){
        animate(swaps);
    },delay);
    
}
function bubbleSort(array) {
    const myParagraph = document.getElementById("sortingInfo");
myParagraph.textContent = "Bubble Sort is a basic sorting algorithm that repeatedly steps through a list, compares adjacent elements, and swaps them if they are in the wrong order. It continues this process until the entire list is sorted. The time complexity of Bubble Sort is O(n^2), making it less efficient than other sorting algorithms for large datasets.";
   const swaps=[];
    do{
        var swapped=false;
        for(let i = 1; i<numElements;i++){
            if(array[i-1] > array[i]){
                swapped = true;
                 //   2   ** push swap into it
                 swaps.push([i-1,i]);
                [array[i-1],array[i]] = [array[i],array[i-1]];
            }
        }
    } while(swapped);
    //   3   **return the swaps */
    return swaps
}
function selectionSort(arr) {
    const myParagraph = document.getElementById("sortingInfo");
myParagraph.textContent = "Selection Sort is a simple sorting algorithm that divides the input list into a sorted and an unsorted region. The algorithm repeatedly selects the smallest (or largest, depending on the sorting order) element from the unsorted region and swaps it with the first element of the unsorted region. This process continues until the entire list is sorted. Selection Sort has a time complexity of O(n^2). Similar to Bubble Sort, it is not the most efficient algorithm for large datasets, but it serves educational purposes and can be useful for small datasets."

    const swaps=[];
    for (let i = 0; i < arr.length; i++) {
        (() => setTimeout(() => console.log(), (delay+1)*2))();
      let lowest = i
      swaps.push([lowest,i]);
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[lowest]) {
          lowest = j
          swaps.push([lowest,j]);
        }
      }
      if (lowest !== i) {
        // Swap
        ;[arr[i], arr[lowest]] = [arr[lowest], arr[i]]
        swaps.push([i,lowest]);
      }
    }
    enableButtons();
    return swaps
  }
function quickSortHolder(arr){
    const myParagraph = document.getElementById("sortingInfo");
myParagraph.textContent = "Quick Sort is a highly efficient, divide-and-conquer sorting algorithm. It works by selecting a pivot element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. Quick Sort is known for its average-case time complexity of O(n log n) and is often faster in practice than other O(n log n) algorithms. However, its worst-case time complexity is O(n^2), which can occur when an ill-chosen pivot consistently divides the array into unbalanced partitions. To mitigate this, randomized versions of Quick Sort are commonly used.";
    disableButtons();
    const copy=[...array];

    quickSort(copy,0,numElements);
    animate(quicksortSwaps);
}
function quickSort(arr,start,end){
    if(start >= end) {
        return;
    }

    let index = partion(arr,start,end);
    quickSort(arr,start,index-1);
    quickSort(arr,index+1,end);
} 
function partion(arr,start,end) {
    let pivotIndex = start;
    let pivotValue = arr[end];
    let j = start;
    for(; j < end;j++) {
        if(arr[j] < pivotValue) {
            swapElems(arr,j,pivotIndex);
            quicksortSwaps.push([j,pivotIndex]);
            pivotIndex++;
        }
    }
    swapElems(arr,pivotIndex,end);
    quicksortSwaps.push([pivotIndex,end]);
    return pivotIndex;
}

function swapElems(arr,a,b){
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}
function showBars(indices){
    container.innerHTML="";
    for(let i = 0; i < numElements; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i]*100+"%";
    bar.classList.add("bar");
    if(indices && indices.includes(i)){
        bar.style.backgroundColor = "red";
    }
    //here
        container.appendChild(bar);
    
    }
    if(numElements > 113) {
        var elements = document.getElementsByClassName("bar");
        for (var j = 0; j < elements.length; j++) {
        elements[j].style.width = "3px";
        elements[j].style.margin = "1px";
        }
    }
    if(numElements > 280) {
        var elements = document.getElementsByClassName("bar");
        for (var j = 0; j < elements.length; j++) {
        elements[j].style.width = "2px";
        elements[j].style.margin = "1px";
        }
    }
    if(numElements > 350) {
        var elements = document.getElementsByClassName("bar");
        for (var j = 0; j < elements.length; j++) {
        elements[j].style.width = "1px";
        elements[j].style.margin = "1px";
        }
    }
    
        
}