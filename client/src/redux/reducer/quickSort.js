export function quickSort(array) {
  if (array.flat().length <= 1) return array;

  let pivot = array.flat()[Math.floor(Math.random() * array.flat().length)];
  let left = [];
  let right = [];
  let equal = [];
  
  for (let i = 0; i < array.flat().length; i++) {
    // console.log('SOY ARRAY.FLAT', array.flat())
    // console.log('SOY PIVOT', pivot)
    if (array.flat()[i]) {
      if(array.flat()[i].name < pivot.name){
        left.push(array.flat()[i]);
      } else if (array.flat()[i].name > pivot.name) {
        right.push(array.flat()[i]);
      } else {
        equal.push(array.flat()[i]);
    }
  }
}

  let ordenAsc = quickSort(left).concat(equal).concat(quickSort(right));
  // let ordenDesc = ordenAsc.reverse();
  return ordenAsc;
}

export function quickSortDesc(array) {
  if (array.flat().length <= 1) return array;

  let pivot = array.flat()[Math.floor(Math.random() * array.flat().length)];
  let left = [];
  let right = [];
  let equal = [];

  for (let i = 0; i < array.flat().length; i++) {
    // console.log('SOY ARRAY.FLAT', array.flat())
    // console.log('SOY PIVOT', pivot)
    if (array.flat()[i]) {
      if (array.flat()[i].name < pivot.name) {
        left.push(array.flat()[i]);
      } else if (array.flat()[i].name > pivot.name) {
        right.push(array.flat()[i]);
      } else {
        equal.push(array.flat()[i]);
      }
    }
  }

  let ordenAsc = quickSort(left).concat(equal).concat(quickSort(right));
  let ordenDesc = ordenAsc.reverse();
  return ordenDesc;
}

export function quickSortWeight(array) {
  if (array.flat().length <= 1) return array;

  let pivot = array.flat()[Math.floor(Math.random() * array.flat().length)].weight.slice(0, 2);
  let left = [];
  let right = [];
  let equal = [];
  let pivotInt = parseInt(pivot);

  for (let i = 0; i < array.flat().length; i++) {
    let p = array.flat()[i].weight.slice(0, 2);
    let peso = parseInt(p);
    // console.log('SOY PIVOTINT', pivotInt)
    // console.log('SOY PESO', peso)

    
    console.log('SOY ARRAY.FLAT', array.flat())
    console.log('SOY ARR FLAT [I]', array.flat()[i])


    if (array.flat() !== 'null') {
      if (peso < pivotInt) {
        left.push(array.flat()[i]);
      } else if (peso > pivotInt) {
        right.push(array.flat()[i]);
      } else {
        equal.push(array.flat()[i]);
      }
     
    }
  }

  let ordenAsc = quickSortWeight(left)
    .concat(equal)
    .concat(quickSortWeight(right));
  // let ordenDesc = ordenAsc.reverse();
  return ordenAsc;
}

export function quickSortWeightDesc(array) {
  if (array.flat().length <= 1) return array;

  let pivot = array.flat()[Math.floor(Math.random() * array.flat().length)].weight.slice(0, 2);
  let left = [];
  let right = [];
  let equal = [];
  let pivotInt = parseInt(pivot);

  for (let i = 0; i < array.flat().length; i++) {
    let p = array.flat()[i].weight.slice(0, 2);
    let peso = parseInt(p);

    console.log('SOY ARRAY.FLAT', array.flat())
    console.log('SOY ARR FLAT [I]', array.flat()[i])
    if (array.flat()) {
      if (peso < pivotInt) {
        left.push(array.flat()[i]);
      } else if (peso > pivotInt) {
        right.push(array.flat()[i]);
      } else {
        equal.push(array.flat()[i]);
      }
    
  }
  }

  let ordenAsc = quickSortWeightDesc(left)
    .reverse()
    .concat(equal)
    .concat(quickSortWeightDesc(right).reverse());
  let ordenDesc = ordenAsc.reverse();
  return ordenDesc;
}
