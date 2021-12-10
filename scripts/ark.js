/** ark */
(function () {
    var scr;
    let cols = 11;
    let round = 1;
    let mX, mY;
    let brickWidth = 16;
    let brickHeight = 8;
    let pixelSize = 4;
    let speed = 5;
    let bspeedh = 5;

    let bricks = [
        { color: dcl.palette.cga[15], points: () => 50, destructable: true, life: 1 },
        { color: dcl.palette.cga[4], points: () => 60, destructable: true, life: 1 },
        { color: dcl.palette.cga[9], points: () => 70, destructable: true, life: 1 },
        { color: dcl.palette.cga[10], points: () => 80, destructable: true, life: 1 },
        { color: dcl.palette.cga[12], points: () => 90, destructable: true, life: 1 },
        { color: dcl.palette.cga[1], points: () => 100, destructable: true, life: 1 },
        { color: dcl.palette.cga[13], points: () => 110, destructable: true, life: 1 },
        { color: dcl.palette.cga[14], points: () => 120, destructable: true, life: 1 },
        { color: dcl.palette.cga[7], points: () => 50 * round, destructable: true, life: 2 },
        { color: dcl.palette.cga[6], points: 0, destructable: false },
    ];
    let ball = [
        -1, 7, 7, 7, -1,
        7, 63, 63, 7, 56,
        7, 63, 7, 7, 56,
        7, 7, 7, 56, 56,
        -1, 56, 56, 56, -1
    ];
    let brick = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];
    let levels = [
        [
            8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
            4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        ],
        [
            1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            1, 2, 3, -1, -1, -1, -1, -1, -1, -1, -1,
            1, 2, 3, 5, -1, -1, -1, -1, -1, -1, -1,
            1, 2, 3, 5, 4, -1, -1, -1, -1, -1, -1,
            1, 2, 3, 5, 4, 1, -1, -1, -1, -1, -1,
            1, 2, 3, 5, 4, 1, 2, -1, -1, -1, -1,
            1, 2, 3, 5, 4, 1, 2, 3, -1, -1, -1,
            1, 2, 3, 5, 4, 1, 2, 3, 5, -1, -1,
            1, 2, 3, 5, 4, 1, 2, 3, 5, 4, -1,
            1, 2, 3, 5, 4, 1, 2, 3, 5, 4, 1
        ],
        [
            3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0,
            6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            5, 5, 5, 9, 9, 9, 9, 9, 9, 9, 9,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            9, 9, 9, 9, 9, 9, 9, 9, 5, 5, 5
        ],
        [
            -1, 8, 1, 3, 6, -1, 1, 3, 5, 8, -1,
            -1, 5, 3, 1, 4, -1, 3, 1, 8, 5, -1,
            -1, 3, 8, 4, 1, -1, 5, 8, 1, 3, -1,
            -1, 1, 4, 6, 3, -1, 8, 5, 3, 1, -1,
            -1, 4, 1, 3, 5, -1, 1, 3, 6, 4, -1,
            -1, 6, 3, 1, 9, -1, 3, 1, 4, 6, -1,
            -1, 3, 5, 9, 1, -1, 6, 4, 1, 3, -1,
            -1, 1, 9, 5, 3, -1, 4, 6, 3, 1, -1,
            -1, 5, 3, 1, 4, -1, 3, 1, 8, 5, -1,
            -1, 3, 8, 4, 1, -1, 5, 8, 1, 3, -1,
            -1, 1, 4, 6, 3, -1, 8, 5, 3, 1, -1,
            -1, 4, 1, 3, 5, -1, 1, 3, 6, 4, -1,
            -1, 6, 3, 1, 9, -1, 3, 1, 4, 6, -1
        ]
    ];
    let paddle = [
        -1, -1, 4, 4, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 4, 4, -1, -1,
        -1, 4, 60, 60, 0, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 0, 60, 60, 4, -1,
        15, 60, 4, 4, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 4, 4, 60, 15,
        15, 4, 4, 4, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 4, 4, 4, 15,
        -1, 4, 4, 4, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 4, 4, 4, -1,
        -1, -1, 4, 4, 0, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 0, 4, 4, -1, -1,

    ];
    let px, py, bx, by, ba, bv, bh,bbtop,bbleft,bbright;

    function setup() {
        scr = dcl.setupScreen(800, window.innerHeight);
        scr.setBgColor('black');
        document.body.style.backgroundColor = 'grey';
        mX = floor(scr.width / 2 - (cols * brickWidth * pixelSize) / 2);
        px = floor(floor(scr.width / 2) - (25 * pixelSize) / 2);
        py = floor(scr.height - 6 * pixelSize - scr.height / 5);
        bx = px+ floor((25 * pixelSize) / 2) - floor((5*pixelSize)/2);
        by = py - 5 * pixelSize;
        bv = 5;
        bbtop = {x:-0, y:-100, width:scr.width, height:100};
        bbleft = {x:-100, y:0, width:100, height:scr.height};
        bbright = {x:scr.width-5, y:0, width:100, height:scr.height};
    }

    function update() {
        if (KEYB.keyPressed) {
            if (KEYB.keyPressed === KEYS.LEFT) {
                px -= speed;
                if (px < 0) {
                    px = 0;
                }
            } else if (KEYB.keyPressed === KEYS.RIGHT) {
                px += speed;
                if (px > scr.width - 25 * pixelSize) {
                    px = scr.width - 25 * pixelSize;
                }
            }
        }
        let bbball = { x: bx, y: by, width: 5 * pixelSize, height: 5 * pixelSize };
        const bbpaddle = { x: px, y: py, width: 25 * pixelSize, height: 6 * pixelSize };
        
        breakout: if(hitTest(bbball, bbpaddle)){
            if(by>py){
                break breakout;
            }
            bv = -bv;
            let npx = px + (25*pixelSize)/2;
            let nbx = bx + (5*pixelSize)/2;
            let ndiff = (nbx-npx)/((25*pixelSize/2));
            bh = ndiff*bspeedh;
            speed += Math.abs(ndiff);
            if(speed > 10){
                speed = 10;
            }
        }
        if(hitTest(bbball,bbtop )){
            bv = -bv;
        }
        if(hitTest(bbball, bbleft)||hitTest(bbball, bbright)){
            bh = -bh;
        }
        by += bv;
        bx += bh;
    }

    function main(dt) {
        update();
        draw();
        requestAnimationFrame(main);
    }

    function drawBM(bm, dx, dy, w) {
        bm.forEach((p, i) => {
            if (p < 0) {
                return;
            }
            let x = i % w;
            let y = floor(i / w);
            let offsetX = x * pixelSize + dx;
            let offsetY = y * pixelSize + dy;
            dcl.rect(offsetX, offsetY, pixelSize, pixelSize, dcl.palette.ega[p], 0, dcl.palette[p]);
        });
    }

    function hitTest(a, b) {
        
        return ((a.x + a.width) >= b.x) &&
            (a.x <= (b.x + b.width)) &&
            ((a.y + a.height) >= b.y) &&
            (a.y <= (b.y + b.height));
    }

    function draw() {
        dcl.clear();
        mY = floor(scr.height / 2 - (floor(levels[round - 1].length / cols) * brickHeight * pixelSize) * 2);
        levels[round - 1].forEach((t, i) => {
            if (t < 0) {
                return;
            }

            let x = i % cols;
            let y = floor(i / cols);
            let offsetX = x * brickWidth * pixelSize + mX;
            let offsetY = y * brickHeight * pixelSize + mY;
            dcl.rect(offsetX, offsetY, brickWidth * pixelSize, brickHeight * pixelSize, bricks[t].color, pixelSize, BLACK);
            if (bricks[t].life > 1) {
                dcl.rect(offsetX, offsetY, brickWidth * pixelSize, pixelSize, dcl.palette.ega[63]);
                dcl.rect(offsetX, offsetY, pixelSize, brickHeight * pixelSize, dcl.palette.ega[63]);
            }
        });
        drawBM(paddle, px, py, 25);
        drawBM(ball, bx, by, 5);
        // paddle.forEach((p, i) => {
        //     if (p < 0) {
        //         return;
        //     }
        //     let x = i % 25;
        //     let y = floor(i / 25);
        //     let offsetX = x * pixelSize + px;
        //     let offsetY = y * pixelSize + py;
        //     dcl.rect(offsetX, offsetY, pixelSize, pixelSize, dcl.palette.ega[p], 0, dcl.palette[p]);
        // });

    }

    setup();
    main();
})();