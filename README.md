# Sorting Visualizer

Sorting algorithm visualization tool to illustrate and compare the mechanics and efficiency of various sorting algorithms in real-time. This tool allows you to change the algorithm, adjust the number of items in the dataset between 1 and 1,000 and change the speed at which the algorithm executes between 1ms and 1000ms.

## Live Demo

[View Live Site Here](https://tylermommsen-sorting-visualizer.vercel.app/)

## Built With

<div>
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="html icon">
  </br>
  <img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" alt="sass icon">
  </br>
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="javascript icon">
</div>

## Sorting Algorithms

- **Quicksort** - Selects a 'pivot' element from the array and partitions the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.

- **Bubble Sort** - Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.

- **Insertion Sort** - Builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.

- **Merge Sort** - A divide and conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.

- **Selection Sort** - Divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list, and a sublist of the remaining unsorted items. The algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist, exchanging it with the leftmost unsorted element, and moving the sublist boundaries one element to the right.

- **Radix Sort** - Sorts numbers digit by digit, starting from the least significant digit to the most significant digit. Radix sort uses counting sort as a subroutine to sort.

- **Bucket Sort** - Distributes the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sort algorithm.

- **Heap Sort** - A hybrid stable sorting algorithm derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data.

## Gif
![sortingvisualizationgif](https://github.com/TylerMommsen/sorting-visualizer/assets/65496518/e2406e34-9b15-44ce-8139-c5f75798b21b)

## Development

Follow these steps to run the project locally.

1. Clone the repository.

HTTPS

```sh
git clone https://github.com/TylerMommsen/pathfinding-visualizer.git
```

SSH

```sh
git clone git@github.com:TylerMommsen/pathfinding-visualizer.git
```

2. Install dependenices

```sh
npm install
```

3. Run the project

```sh
npm run dev
```
