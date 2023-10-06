export default class Game {
    score = 0;
    lines = 0;
    level = 0;
    playfield = this.createPlayfield();
    activePieceX = 0;
    activePieceY = 0;
    activePiece = {
        x: 0,
        y: 0,
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

    nextPiece = this.createPiece();

    getState() {
        const playfield = this.createPlayfield();
        const { x: pieceX, y: pieceY, blocks } = this.activePiece;
    
        for (let y = 0; y < this.playfield.length; y += 1) {
          playfield[y] = [];
    
          for (let x = 0; x < this.playfield[y].length; x += 1) {
            playfield[y][x] = this.playfield[y][x];
          }
        }
    
        for (let y = 0; y < blocks.length; y += 1) {
          for (let x = 0; x < blocks[y].length; x += 1) {
            if (blocks[y][x]) {
              playfield[pieceY + y][pieceX + x] = blocks[y][x];
            }
          }
        }
        return playfield
    }
    
    createPlayfield () {
        const playfield = []
        for (let y = 0; y < 20; y++) {
            playfield[y] = []
            for (let x = 0; x < 10; x++) {
                playfield[y][x] = 0
            }
        }
        return playfield
    }

    createPiece() {
        const index = Math.floor(Math.random() * 7);
        const type = 'IJLOSTZ'[index]
        const piece = {}


        switch (type) {
            case 'I':
              piece.blocks = [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
              ];
              break;
            case 'J':
              piece.blocks = [
                [0, 0, 0],
                [2, 2, 2],
                [0, 0, 2],
              ];
              break;
            case 'L':
              piece.blocks = [
                [0, 0, 0],
                [3, 3, 3],
                [3, 0, 0],
              ];
              break;
            case 'O':
              piece.blocks = [
                [0, 0, 0, 0],
                [0, 4, 4, 0],
                [0, 4, 4, 0],
                [0, 0, 0, 0]
              ];
              break;
            case 'S':
              piece.blocks = [
                [0, 0, 0],
                [0, 5, 5],
                [5, 5, 0],
              ];
              break;
            case 'T':
              piece.blocks = [
                [0, 0, 0],
                [6, 6, 6],
                [0, 6, 0],
              ];
              break;
            case 'Z':
              piece.blocks = [
                [0, 0, 0],
                [7, 7, 0],
                [0, 7, 7],
              ];
              break;
            default:
              throw new Error(`Unknown type of piece: ${type}`);
          }
      
          piece.x = Math.floor((10 - piece.blocks[0].length) / 2);
          piece.y = -1;
      
          return piece;
    }

    movePieceLeft() {
        this.activePiece.x -= 1

        if (this.hasCollision()) {
            this.activePiece.x +=1
        }
        console.log('lef');
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
            this.lockPiece();
            this.updatePieces();
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
        const playfield = this.playfield


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

    clearLines() {
        const rows = 20;
        const columns = 10;
        let lines = []

        for (let y = rows - 1; y >=0; y--){
            let numberOfBlocks = 0

            for (let x = 0; x< columns; x++){
                if (this.playfield[y][x]) {
                 numberOfBlocks += 1;
                }
            }
            if (numberOfBlocks === 0) {
                break;
            }
            else if (numberOfBlocks < columns) {
                continue
            }
            else if (numberOfBlocks === columns) {
                lines.unshift(y)
            }
            for (let index of lines) {
                this.playfield.splice(index, 1)
                this.playfield.unshift(new Array(columns).fill)
            }
        }
    }

    updatePieces() {
        this.activePiece = this.nextPiece
        this.nextPiece = this.createPiece()
        this.activePiece.rotationIndex = 0;
    }
} 

