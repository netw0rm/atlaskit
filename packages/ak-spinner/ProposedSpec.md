Spinner component used to show a waiting state.

[Prototype](http://proto.office.atlassian.com/spinners/final/)

[Design spec (incomplete)](https://extranet.atlassian.com/display/ADG/Spinners+product)


[Design Exploration](https://extranet.atlassian.com/display/ADG/1.0+Explore+-+Progress+indicators+product)

## Must haves:
* t-shirt sizes (lining up with the grid)
* Needs to display intro animation when it starts
* Needs to display outro animation when it leaves

## Questions:
* Could this just be done in ak-icon?
  * Probably not as it needs to display the outro animation
  * Could maybe still put it in ak-icon then use the icon from there?
* Should the spinner be able to be centered automatically?
  * Behind a flag maybe?
* Should the spinner prevent clicks on the page?
  * Will this become hard when you have two on the page?
  * Does it make more sense to use blanket for this?
  * Maybe blanket should just support a "waiting" mode that displays the spinner?
* Should it have a declarative of imperative way of signal completion?
  * .done(), .leave(), .playOutro(), .finished()
  * isDone, shouldLeave, isFinishing, etc

## Proposed Props:
* `size` - One of x-small, small, medium, large, x-large (tbc)
* `onOutroComplete` - function to call after the outro
  * Other possible names: onLoadingDone, onUnload?, onDone, onLoad
* `shouldLeave` - boolean signalling to play the outro animation
  * Other possible names: isDone, isFinishing, willLeave

## Accessibility Concerns:
* Investigate if we need to apply any roles to this?
  * aria-wait I think it's called?


```js
<SomeComponent>
  <Spinner isReady onOutroComplete={this.signalLoadComplete}/>
</SomeComponent>
```