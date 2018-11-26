# mediaevents
Media Events

Init the default media events script
```
InitMediaEvents.init();
```

Init the default media events script with parameters
```
InitMediaEvents.init({
    breakpoints: {
        sm: 768,
        md: 1024
    },
    eventName: 'myMedia'
});
```
`breakpoints` is an object with your own breakpoints where:
* `key` > suffix of the media event
* `value` > size

`eventName` is a name of the event which will be called.

For example: 
* `myMedia` + `sm` = `myMediaSM`;
* `window.addEventListener('myMediaSM', fn..)`;

By default:
```
breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
}
```
```
eventName: 'media'
```