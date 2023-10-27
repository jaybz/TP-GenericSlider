# TP-GenericSlider
This is a plugin for [Touch Portal](https://www.touch-portal.com/) that provides generic slider connectors that uses the slider to control the value of any variable. This is mostly for controlling plugins that do not have built-in slider support.

## Platform support
This plugin currently only works for Windows. MacOS support is currently being worked on.

## Available actions
- Generic Slider Connector - Creates a dynamic plugin state using the Slider ID you enter as the first parameter. You can use the values from and to field to set a range of values to use for the plugin state. Whenever the slider's value changes, the plugin state will be updated with the appropriate value between the from and to parameters. After setting this up, you can then use plugin-state change events to respond to slider value changes.
- Set Slider Value - Let's you set the slider's value. Useful for updating the slider in response to changes to variables or plugin states.

## Credits
- The integration into Touch Portal uses [Touch Portal API for Node.JS](https://github.com/spdermn02/touchportal-node-api)
- Thanks to [Touch Portal](https://www.touch-portal.com/), without it, you won't be able to use this plugin.

## Contributing
If you wish to contribute, simply fork this repository and submit your changes via pull request targeting the develop branch or a feature branch. Please do not target the release branch in your pull requests.
