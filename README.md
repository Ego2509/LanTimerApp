# LanTimerApp: A way for timing and cycling through different devices for your table games in your local network 

[![ezgif-2-057a36eed0.gif](https://i.postimg.cc/sXbm4YRt/ezgif-2-057a36eed0.gif)](https://postimg.cc/TLqnRW19)

This template project provides a way for timing and cycling through phones on your table games on a LAN.
Adapt it on for your own projects.

## Requirements

If you are using yarn, install the required packages with the lockfile

```sh
yarn
```
If you are using npm:

```sh
npm install
```
## Usage

1. Start by modifying the `public/index`, adding the server's local ip.

```sh
hostname -I | awk '{print $1}'
```
then change the following line

```js
window.onload=()=>{
    // socket handler
    server_ip_lan="10.1.211.85" // <- paste here your server's ip
    socket=io.connect(server_ip_lan+":8080",{reconnection: false})
```



2. Once you're done, start the server
```sh
node main.js
```
you should get this prompt depending on your selected port:

[![Screenshot-from-2022-05-24-16-23-59.png](https://i.postimg.cc/jSyWkzYz/Screenshot-from-2022-05-24-16-23-59.png)](https://postimg.cc/xXTTXNCC)

3. To add the playing devices (phones, computers or anything that has access to an internet browser and your local network), access the server's ip through your browser's the search bar, for example `http://10.1.211.85:8080/`.

4. Once all the devices have entered to the network, set their ids in your preferred order (starting from *0*) followed by the enter keystroke (so the server assigns each socket with its respective id).

5. Now, you're ready to start the cycle! make sure to press NEXT when you're done with your turn, so other players don't get bored waiting for the clock to finish. 


## License

MIT
