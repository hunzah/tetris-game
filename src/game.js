export default class Game {
    score = 0;
    lines = 0;
    level = 0;
    playfield = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],       
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],       
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];
    activePieceX = 0;
    activePieceY = 0;
    activePiece = {
        x:0,
        y:0,
        get blocks(){ 
            return this.rotations[this.rotationIndex];
    },
        // все возможные варианты положения фигуры
        rotationIndex: 0,
        rotations: [
            [
                [0,1,0],
                [1,1,1],
                [0,0,0],
            ],
            [
                [0,1,0],
                [0,1,1],
                [0,1,0],
            ],
            [
                [0,0,0],
                [1,1,1],
                [0,1,0],
            ],
            [
                [0,1,0],
                [1,1,0],
                [0,1,0],
            ],
        ]
    };

    movePieceLeft() {
        this.activePiece.x -= 1

        if (this.hasCollision()) {
            this.activePiece.x +=1
        }
    }

    movePieceRight() {
        this.activePiece.x += 1

        if (this.hasCollision()) {
            this.activePiece.x -=1
        }
    }

    movePieceDown() {
        this.activePiece.y += 1

        if (this.hasCollision()) {
            this.activePiece.y -=1
        }
    }
    rotatePiece(){
        this.activePiece.rotationIndex = this.activePiece.rotationIndex < 3 ? this.activePiece.rotationIndex + 1 : 0;
        if (this.hasCollision()) {
            this.activePiece.rotationIndex = this.activePiece.rotationIndex > 0 ? this.activePiece.rotationIndex - 1 : 3;
        }
        return this.activePiece.blocks
    }
    hasCollision() {
        const blocks = this.activePiece.blocks
        const {x: piecX, y: pieceY} = this.activePiece
        const {playfield} = this.playfield


        for (let y = 0; y < blocks.length; y++){
            for (let x = 0; x < blocks[y].length; x++){
                if (
                    blocks[y][x] && 
                    (playfield[pieceY + y] === undefined || 
                    playfield[pieceY + y][piecX + x] === undefined ||
                    playfield[pieceY + y][piecX + x]
                    )) {
                    return true
                }
            }
        }
        return false    
    }

    lockPiece(){
        const {x: piecX, y: pieceY, blocks} = this.activePiece

        for (let y = 0; y < blocks.length; y++){
            for (let x = 0; x < blocks[y].length; x++){
                if (blocks[y][x]) {
                this.playfield[pieceY + y][piecX + x] = blocks[y][x]
                }
            }
        }
    }
} 