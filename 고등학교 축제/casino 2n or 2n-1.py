import pygame as pg
from sys import exit
import random as rd
pg.init()
pg.mixer.init()

onGame=True
ButtonPused=False

BROWN=(151,75,0)
WHITE=(255,255,255)

screen_width = 1728
screen_height=972

screen = pg.display.set_mode((screen_width, screen_height))
pg.display.set_caption("기흥랜드") 

background = pg.image.load("src\\background.jpg")

offedleverone=pg.image.load("src\\lever_offed1.png")
offedlevertwo=pg.image.load("src\\lever_offed2.png")
onedleverone=pg.image.load("src\\lever_oned1.png")

bFont=pg.font.Font("src\\Cafe24Classictype.ttf",100)
bbFont=pg.font.Font("src\\Cafe24Classictype.ttf",160)
sFont=pg.font.Font("src\\Cafe24Classictype.ttf",65)
mFont=pg.font.Font("src\\Cafe24Classictype.ttf",130)

giheungLandText=bFont.render("기흥랜드",True,BROWN)
dooGeunText=sFont.render("두근두근 고수익 놀이터",True,BROWN)
twonpoText=mFont.render("홀",True,WHITE)
twonText=mFont.render("짝",True,WHITE)

leverDownSound=pg.mixer.Sound("src\\leverDownSound.mp3")
ResultingSound=pg.mixer.Sound("src\\ResultingSound.mp3")
shufflingSound=pg.mixer.Sound("src\\shufflingSound.mp3")

channel1 = pg.mixer.Channel(0) #기본 소리 재생
channel2 = pg.mixer.Channel(1) #셔플링

channel1.set_endevent(pg.USEREVENT+1)
channel2.set_endevent(pg.USEREVENT+2) #커스텀 이벤트 등록

fTick =0
tTick=0
turn=0

Tduration=0


rTx=780
rTy=420
shuffleOncePlayed=False
resultOncePlayed=False
waitingTick=0
while onGame==True:
    
    screen.blit(background,(-96,-54))



    screen.blit(giheungLandText,(650,55))
    screen.blit(dooGeunText, (500,840))

    if 1510<pg.mouse.get_pos()[0]<1660 and 405<pg.mouse.get_pos()[1]<605 and ButtonPused==False:
        screen.blit(offedlevertwo, (1510,405))
        if pg.mouse.get_pressed()[0]==1 and ButtonPused==False:
            ButtonPused=True
            randomTick=rd.randint(1500,2500)
            fTick=0
            tTick=0
            turn=0
            Tduration=0
            channel1.play(leverDownSound)
    elif ButtonPused==True:
        screen.blit(onedleverone,(1510,455))
    else:
        screen.blit(offedleverone,(1510,405))
    



    if ButtonPused==True and fTick<randomTick:
        if turn==0 and tTick==30:
            turn=1
            tTick=0
            rTx=780
            rTy=420
        elif turn==1 and tTick==30:
            turn=0
            tTick=0
            rTx=780
            rTy=420
        if turn==0:
            if tTick<20:
                rTy-=1.2
                screen.blit(twonpoText,(rTx,rTy))
            else:
                rTy+=.7
                screen.blit(twonpoText,(rTx,rTy))
        else:
            if tTick<20:
                rTy-=1.2
                screen.blit(twonText,(rTx,rTy))
            else:
                rTy+=.7
                screen.blit(twonText,(rTx,rTy))
        fTick+=1
        tTick+=1
        if shuffleOncePlayed==False and fTick>160:
            channel2.play(shufflingSound)
            shuffleOncePlayed=True


    if ButtonPused==True and fTick==randomTick and Tduration<950:
        channel2.stop()
        if turn==0:
            resultText=bbFont.render("홀!",True,WHITE)
            screen.blit(resultText,(753,390)) #790 430
        elif turn==1:
            resultText=bbFont.render("짝!",True,WHITE)
            screen.blit(resultText,(753,390))
        Tduration+=1
        if resultOncePlayed==False:
            channel1.play(ResultingSound)
            resultOncePlayed=True
        if Tduration==949:
            ButtonPused=False
            shuffleOncePlayed=False
            resultOncePlayed=False



    for event in pg.event.get(): #close window when close button is pressed
        if event.type == pg.QUIT:
            exit()
        elif event.type==pg.USEREVENT+2 and fTick<randomTick and ButtonPused==True:
            channel2.play(shufflingSound)
        elif event.type==pg.USEREVENT+1 and ButtonPused==True:
            channel1.stop()

    pg.display.update()

pg.quit()
