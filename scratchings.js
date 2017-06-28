// const horribleDangerTime = i => (
//   new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('resolving horrible danger', i);
//       resolve();
//     }, 1000);
//   })
// );
//
// const horribleDangerTimes = pathNames => Promise.all(pathNames.map(horribleDangerTime));
//
// const someArrayProbably = [1, 2, 3, 4, 5];
//
// horribleDangerTimes(someArrayProbably)
// .then(() => console.log('we ran some horrible danger times'));
