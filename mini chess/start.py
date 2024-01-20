import pygame as pg
import time
class Pawn: #폰
    lives = 0
    pawnCollide = 0
    def __init__(self, xp, yp):
        self.object = pg.image.load("sources\\pawn.png")
        self.size = self.object.get_rect().size
        self.width = self.size[0]
        self.height = self.size[1]
        self.xpos = xp
        self.ypos = yp
        self.curSel = False
        self.arl = False
        self.dead = False
        self.arlAddCollide = False
        Pawn.lives += 1
    
    def fMove(self, mousX, mousY):
        global whosturn
        global isCol
        movX = mousX
        movY = mousY
        if self.arl == False:
            if self.height < movY < self.height * 4 :
                if self.xpos < mousX < self.xpos + self.width:
                    while movX % 80 != 0:
                        movX = movX - 1
                    while movY % 80 != 0:
                        movY = movY - 1
                    for pws in pawns:
                        if movX == pws.xpos and movY == pws.ypos:
                            isCol = True
                    for rks in rooks:
                        if movX == rks.xpos and movY == rks.ypos:
                            isCol = True
                    if isCol == False:
                        put_sound.play()
                        self.xpos = movX
                        self.ypos = movY
                        self.arl = True
                        self.curSel = False
                        whosturn = "rook"
                    else:
                        isCol = False
        else:
            if self.ypos < mousY < self.ypos + self.height*2 and self.xpos < mousX < self.xpos + self.width:
                    while movX % 80 != 0:
                        movX = movX - 1
                    while movY % 80 != 0:
                        movY = movY - 1
                    for pws in pawns:
                        if movX == pws.xpos and movY == pws.ypos:
                            isCol = True
                    for rks in rooks:
                        if movX == rks.xpos and movY == rks.ypos:
                            isCol = True
                    if isCol == False:
                        put_sound.play()
                        self.xpos = movX
                        self.ypos = movY
                        self.curSel = False
                        whosturn = "rook"
                    else:
                        isCol = False
    
    def sMove(self, mousX, mousY):
        global whosturn
        if self.xpos + self.width < mousX < self.xpos + self.width * 2 and self.ypos + self.height < mousY < self.ypos + self.height*2:
            for rks in rooks:
                if rks.xpos < mousX < rks.xpos + rks.width and rks.ypos < mousY < rks.ypos + rks.height:
                    put_sound.play()
                    self.xpos = rks.xpos
                    self.ypos = rks.ypos
                    rks.object.fill(transparent)
                    rks.dead = True
                    Rook.lives -= 1
                    self.curSel = False
                    whosturn = "rook"
        elif self.xpos - self.width < mousX < self.xpos and self.ypos + self.height < mousY < self.ypos + self.height * 2:
            for rks in rooks:
                if rks.xpos < mousX < rks.xpos + rks.width and rks.ypos < mousY < rks.ypos + rks.height:
                    put_sound.play()
                    self.xpos = rks.xpos
                    self.ypos = rks.ypos
                    rks.object.fill(transparent)
                    rks.dead = True
                    Rook.lives -= 1
                    self.curSel = False
                    whosturn = "rook"
    
    def onlySel(self ,me):
        myNum = pawns.index(me)
        for eles in pawns:
            if pawns.index(eles) == myNum:
                self.curSel = True
            else:
                eles.curSel = False
        for eles in rooks:
            eles.curSel = False

class Rook: #룩
    lives = 0
    def __init__(self, xp, yp):
        self.object = pg.image.load("sources\\rook.png")
        self.size = self.object.get_rect().size
        self.width = self.size[0]
        self.height = self.size[1]
        self.xpos = xp
        self.ypos = yp
        self.curSel = False
        self.arl = False
        self.dead = False
        Rook.lives += 1

    def fMove(self, mousX, mousY):
        global whosturn
        global isCol
        movX = mousX
        movY = mousY
        if self.xpos < movX < self.xpos + self.width: #Y축 이동
            while movX % 80 != 0:
                movX = movX - 1
            while movY % 80 != 0:
                movY = movY - 1
            for rks in rooks:
                if movX == rks.xpos and movY == rks.ypos:
                    isCol = True
            for pws in pawns:
                if movX == pws.xpos and movY == pws.ypos:
                    pws.object.fill(transparent)
                    pws.dead = True
                    Pawn.lives -= 1
            if isCol == False:
                put_sound.play()
                self.xpos = movX
                self.ypos = movY
                self.curSel = False
                whosturn = "pawn"
            else:
                isCol = False

        elif self.ypos < movY < self.ypos + self.height: #X축 이동
            while movX % 80 != 0:
                movX = movX - 1
            while movY % 80 != 0:
                movY = movY - 1
            for rks in rooks:
                if movX == rks.xpos and movY == rks.ypos:
                    isCol = True
            for pws in pawns:
                if movX == pws.xpos and movY == pws.ypos:
                    pws.object.fill(transparent)
                    pws.dead = True
                    Pawn.lives -= 1
            if isCol == False:
                put_sound.play()
                self.xpos = movX
                self.ypos = movY
                self.curSel = False
                whosturn = "pawn"
            else:
                isCol = False
    
    def onlySel(self ,me):
        myNum = rooks.index(me)
        for eles in rooks:
            if rooks.index(eles) == myNum:
                self.curSel = True
            else:
                eles.curSel = False
        for eles in pawns:
            eles.curSel = False
            
            

pg.init() #초기화

#차례
global whosturn
whosturn = "pawn"

#겹침의 판단
global isCol
isCol = False

detGameOver = False

#배치 소리
put_sound = pg.mixer.Sound("sources\\Put.mp3")
gameOver_sound = pg.mixer.Sound("sources\\gameOver.mp3")
gameStart_sound = pg.mixer.Sound("sources\\gameStart.mp3")
onMouse_sound = pg.mixer.Sound("sources\\onMouse.mp3")

#화면 세팅 파트
screen_width = 640 #가로
screen_height = 640 #세로
screen = pg.display.set_mode((screen_width, screen_height)) #스크린의 변수화

#투명 -> 게임속 제거
transparent = (0, 0, 0, 0)

#화면 타이틀
pg.display.set_caption("Mini Chess")    

#배경
background = pg.image.load("sources\\backGround_1.png")
before_background = pg.image.load("sources\\BeforebackGround_1.png")
blured_background = pg.image.load("sources\\bluredbackGround_1.png")

#승자
pawnWins = pg.image.load("sources\\pawnWins.png")
rookWins = pg.image.load("sources\\rookWins.png")
draw = pg.image.load("sources\\gameDraw.png")

#턴
pawnsTurn = pg.image.load("sources\\pawnsTurn.png")
rooksTurn = pg.image.load("sources\\rooksTurn.png")

#게임시작 버튼
gameStart_button = pg.image.load("sources\\startButton.png")
gameStart_button_changed = pg.image.load("sources\\changedstartButton.png")

#이벤트에 따른 작동 유무
isRunning = True #게임 진행중의 유무
firstBatch = True #첫번쨰 배치
beforeGame = True
gameover = False
Draw = False

#배치 좌표
batchx = 0
batchy = 80

#폰과 룩에 대한 리스트(각 객체)
pawns = []
rooks = []

#이동될 위치의 x,y좌표
movX = 0
movY = 0

#게임시작버튼 파트
gamestartButton_width = gameStart_button.get_rect().size[0]
gamestartButton_height = gameStart_button.get_rect().size[1]
gamestartx = 170
gamestarty = 400
isMouseOn = False
arlOn = False

win = ""

while beforeGame == True:
    mousePosition = pg.mouse.get_pos()
    clickedOutLeft = pg.mouse.get_pressed()[0]

    for e in pg.event.get(): #이벤트를 가져오는 부분
        if e.type == pg.QUIT:
            isRunning = False
            beforeGame = False
    
    screen.blit(before_background, (0,0))

    if isMouseOn == True and arlOn == False:
        onMouse_sound.play()
        arlOn = True

    if gamestartx < mousePosition[0] < gamestartx + gamestartButton_width and gamestarty < mousePosition[1] < gamestarty + gamestartButton_height:
        if clickedOutLeft == True:
            beforeGame = False
            gameStart_sound.play()
        screen.blit(gameStart_button_changed, (gamestartx,gamestarty))
        isMouseOn = True
    else:
        screen.blit(gameStart_button, (gamestartx,gamestarty))
        arlOn = False
        isMouseOn = False
    
    pg.display.update()


while isRunning and beforeGame == False and Draw == False: #실행루프
    if firstBatch:
        for i in range(0, 8):
            pawns.append(Pawn(batchx, batchy))
            batchx += 80
        firstBatch = False
        rooks.append(Rook(80,480))
        rooks.append(Rook(480,480))
    
    for e in pg.event.get(): #이벤트를 가져오는 부분
        if e.type == pg.QUIT:
            isRunning = False #게임 종료
        
    mousePosition = pg.mouse.get_pos()
    clickedOutLeft = pg.mouse.get_pressed()[0]
    clickedOutRight = pg.mouse.get_pressed()[2]
    
    screen.blit(background, (0,0)) #배경 업데이트

    for pwses in pawns:
        screen.blit(pwses.object, (pwses.xpos, pwses.ypos))
    for rkses in rooks:
        screen.blit(rkses.object, (rkses.xpos, rkses.ypos))

    for pws in pawns:
        if pws.curSel == True and whosturn == "pawn":
            if clickedOutRight == True:
                pws.fMove(mousePosition[0], mousePosition[1])
                pws.sMove(mousePosition[0], mousePosition[1])
                textable = True

    for rks in rooks:
        if rks.curSel == True and whosturn == "rook":
            if clickedOutRight == True:
                rks.fMove(mousePosition[0], mousePosition[1])
                textable = True

    if clickedOutLeft == True:
        for pws in pawns:
            if pws.xpos + pws.width > mousePosition[0] > pws.xpos and pws.ypos + pws.height > mousePosition[1] > pws.ypos and pws.dead == False:
                pws.curSel = True
                pws.onlySel(pws)
        for rks in rooks:
            if rks.xpos + rks.width > mousePosition[0] > rks.xpos and rks.ypos + rks.height > mousePosition[1] > rks.ypos and rks.dead == False:
                rks.curSel = True
                rks.onlySel(rks)
    
    for pws in pawns:
        if pws.ypos == 560:
            isRunning = False
            gameover = True
            win = "pawn"
            gameOver_sound.play()
    
    if Rook.lives == 0:
        isRunning = False
        gameover = True
        win = "pawn"
        gameOver_sound.play()
    
    if Pawn.lives == 0:
        isRunning = False
        gameover = True
        win = "rook"
        gameOver_sound.play()

    if whosturn == "pawn":
        screen.blit(pawnsTurn, (320, 0))
    elif whosturn == "rook":
        screen.blit(rooksTurn, (320, 0))

    if whosturn == "pawn":
        for pws in pawns:
            for rks in rooks:
                if pws.dead == False:
                    tempx = pws.xpos
                    tempy = pws.ypos
                    if tempx == rks.xpos and pws.arlAddCollide == False:
                        if rks.ypos - tempy == 80:
                            Pawn.pawnCollide += 1
                            pws.arlAddCollide = True
    elif whosturn == "rook":
        for pws in pawns:
            if pws.dead == False:
                pws.arlAddCollide = False
        Pawn.pawnCollide = 0
    
    if Pawn.lives == 2 and Pawn.pawnCollide == 2:
        Draw = True
        isRunning = False
        for pwses in pawns:
            screen.blit(pwses.object, (pwses.xpos, pwses.ypos))
        for rkses in rooks:
            screen.blit(rkses.object, (rkses.xpos, rkses.ypos))
        pg.display.update()
        time.sleep(2)
        gameOver_sound.play()
    elif Pawn.lives == 1 and Pawn.pawnCollide == 1:
        Draw = True
        isRunning = False
        for pwses in pawns:
            screen.blit(pwses.object, (pwses.xpos, pwses.ypos))
        for rkses in rooks:
            screen.blit(rkses.object, (rkses.xpos, rkses.ypos))
        pg.display.update()
        time.sleep(2)
        gameOver_sound.play()
    
    pg.display.update()

while Draw == True:
    for e in pg.event.get(): #이벤트를 가져오는 부분
        if e.type == pg.QUIT:
            Draw = False #게임 종료
    screen.blit(blured_background, (0,0))
    screen.blit(draw, (170, 100))
    pg.display.update()

while gameover == True and win == "pawn":
    for e in pg.event.get(): #이벤트를 가져오는 부분
        if e.type == pg.QUIT:
            gameover = False #게임 종료
    screen.blit(blured_background, (0,0))
    screen.blit(pawnWins, (170, 100))
    pg.display.update()
    
while gameover == True and win == "rook":
    for e in pg.event.get(): #이벤트를 가져오는 부분
        if e.type == pg.QUIT:
            gameover = False #게임 종료
    screen.blit(blured_background, (0,0))
    screen.blit(rookWins, (170, 100))
    pg.display.update()
    
pg.quit()
