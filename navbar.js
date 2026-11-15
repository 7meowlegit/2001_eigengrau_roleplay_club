document.write(`
        <style>
        pre a {
                text-decoration: none;
                color: #F5FFFA;/* "man i hate mint chocolate chip" */
                text-shadow: #000 2px 2px 1px;
                padding: 7px;
                display: inline-block;
                width: 200px;
                box-sizing: border-box;
                outline: outset #590000 1px;
                background-color: #000000;
                margin-bottom: 6px;
        }
        pre a:hover {
        color: #f00; 
        text-shadow: #ff3636 0px 1px 6px;
        animation: jiggle 0.9s steps(2) infinite;
        }
        @keyframes jiggle { 
        0% { transform: rotate(0.1deg) translate(-0.5px, -0.5px); letter-spacing: -1px; }
        25% { transform: rotate(0.2deg) translate(0.4px, 0.2px); letter-spacing: -1.1px; }
        50% { transform: rotate(-0.1deg) translate(0, 0); letter-spacing: -1.3px; }
        75% { transform: rotate(0.2deg) translate(-1px, -0.5px); letter-spacing: -1.2px; }
        100% { transform: rotate(0.3deg) translate(-0.1px, -0.5px); letter-spacing: -1.3px; }
        }
</style>
        
<div id="navbar">
        <pre><a href="indexs.html">go back</a></pre>
</div>`);
