from math import sqrt, floor
import pygame as pg
import random

pg.init()

class Cell:
    lives=0
    fGenNs=0
    def __init__(self, x, y, width, height,v):
        self.width = width
        self.height = height
        self.xpos = x
        self.ypos = y
        self.v = v
        self.randx = int
        self.randy = int
        self.srandw = float
        self.srandh = float
        self.randv = float
        self.plmi = float
        self.baby_width = float
        self.baby_height = float
        self.baby_v = float
        self.randT = int
        self.fT = int
        self.Rect = pg.Rect(self.xpos, self.ypos, self.width, self.height)
        self.divW = float
        self.divH = float
        self.divV = float
        Cell.lives+=1
    def display(self):
        pg.draw.rect(screen, color_Black, self.Rect)
    def move(self, randx, randy):
        self.randx = randx
        self.randy = randy
        dist = sqrt((self.randx-self.xpos)**2+(self.randy-self.ypos)**2)
        if dist < self.v:
            self.xpos = self.randx
            self.ypos = self.randy
        else:
            dist_x = (self.randx - self.xpos) * self.v
            dist_y = (self.randy - self.ypos) * self.v
            
            self.xpos += dist_x / dist
            self.ypos += dist_y / dist
    def genBaby(self):
        self.divW = random.randrange(-10,10)
        self.divH = random.randrange(-10,10)
        self.divV = random.randrange(-10,10)
        while self.divW==0:
            self.divW=random.randrange(-10,10)
        while self.divH==0:
            self.divH=random.randrange(-10,10)
        while self.divV==0:
            self.divV=random.randrange(-10,10) 
        self.srandw = random.randrange(-floor(self.width*100),floor(self.width*100))/self.divW
        self.srandh = random.randrange(-floor(self.height*100),floor(self.height*100))/self.divH
        self.randv = random.randrange(-floor(self.v*100),floor(self.v*100))/self.divV
        self.baby_width = self.width+self.srandw/(100*4)
        self.baby_height = self.height+self.srandh/(100*4)
        self.baby_v = self.v+self.randv/(100*4)

        CellList.append(Cell(self.xpos,self.ypos,self.baby_width,self.baby_height,self.baby_v))
        CellList[-1].fT=0
        CellList[-1].randx=random.randint(0,1820)
        CellList[-1].randy=random.randint(0,980)
        CellList[-1].randT=random.randint(StartMovingTime,LimitMovingTime)

    def updatingStatus(self):
        self.Rect = pg.Rect(self.xpos, self.ypos, self.width, self.height)

class Predator:
    lives=0
    def __init__(self,x, y, width, height,v):
        self.xpos = x
        self.ypos = y
        self.width = width
        self.height = height
        self.v = v
        Predator.lives+=1
        self.randx = int
        self.randy = int
        self.Rect = pg.Rect(self.xpos, self.ypos, self.width, self.height)
        self.fT=int
        self.randT=int
        self.killed=0
        self.divW=float
        self.divH=float
        self.divV=float
        self.srandw=float
        self.srandh=float
        self.baby_width=float
        self.baby_height=float
        self.baby_v=float
    def display(self):
        pg.draw.rect(screen, color_Red, self.Rect)
    def move(self, randx, randy):
        self.randx = randx
        self.randy = randy
        dist = sqrt((self.randx-self.xpos)**2+(self.randy-self.ypos)**2)
        if dist < self.v:
            self.xpos = self.randx
            self.ypos = self.randy
        else:
            dist_x = (self.randx - self.xpos) * self.v
            dist_y = (self.randy - self.ypos) * self.v
            
            self.xpos += dist_x / dist
            self.ypos += dist_y / dist
    def genBaby(self):
        self.divW = random.randrange(-10,10)
        self.divH = random.randrange(-10,10)
        self.divV = random.randrange(-10,10)
        while self.divW==0:
            self.divW=random.randrange(-10,10)
        while self.divH==0:
            self.divH=random.randrange(-10,10)
        while self.divV==0:
            self.divV=random.randrange(-10,10) 
        self.srandw = random.randrange(-floor(self.width*100),floor(self.width*100))/self.divW
        self.srandh = random.randrange(-floor(self.height*100),floor(self.height*100))/self.divH
        self.randv = random.randrange(-floor(self.v*100),floor(self.v*100))/self.divV
        self.baby_width = self.width+self.srandw/(100*2)
        self.baby_height = self.height+self.srandh/(100*2)
        self.baby_v = self.v+self.randv/(100*2)

        PredatorList.append(Predator(self.xpos,self.ypos,self.baby_width,self.baby_height,self.baby_v))
        PredatorList[-1].fT=0
        PredatorList[-1].randx=random.randint(0,1820)
        PredatorList[-1].randy=random.randint(0,980)
        PredatorList[-1].randT=random.randint(StartMovingTime,LimitMovingTime)

    
    def updatingStatus(self):
        self.Rect = pg.Rect(self.xpos, self.ypos, self.width, self.height)


            
class Mananger:
    gcgTime=0
    def destroyCells():
        for predators in PredatorList:
            for cells in CellList:
                if predators.Rect.colliderect(cells.Rect):
                    CellList.remove(cells)
                    Cell.lives-=1
                    predators.killed+=1

Generation = 0

screen_width = 1820
screen_height = 980 
screen = pg.display.set_mode((screen_width, screen_height))

pg.display.set_caption("Natural Selection")   

color_White = (255, 255, 255)
color_Red = (255, 0, 0)
color_Green = (0, 255, 0)
color_Blue = (0, 0, 255)
color_Black = (0,0,0)

arialFont = pg.font.SysFont("arial",30,True,True)

playin=True

CellList = []
PredatorList = []

StartMovingTime=300
LimitMovingTime=1000
LimitGeneratingTime=1300

for x in range(0, 13):
    CellList.append(Cell(random.randrange(100, 1700),random.randrange(100, 800), 65, 65,.5))

for x in range(0,4):
    PredatorList.append(Predator(random.randrange(100, 1700),random.randrange(100, 800), 45, 45,.5))

for cells in CellList:
    cells.randx = random.randint(0,1820)
    cells.randy = random.randint(0,980)
    cells.fT=0
    cells.randT=random.randint(StartMovingTime,LimitMovingTime)

for predators in PredatorList:
    predators.randx = random.randint(0,1820)
    predators.randy = random.randint(0,980)
    predators.fT=0
    predators.randT=random.randint(StartMovingTime,LimitMovingTime)

while playin==True:
    screen.fill(color_White)
    cellLivesText = arialFont.render("Entity Lives : "+str(Cell.lives),True,color_Black)
    GenerationText = arialFont.render(str(Generation)+" Generation",True,color_Black)
    sizeTotal=0
    for predators in PredatorList:
        sizeTotal=sizeTotal+predators.width*predators.height
    sizeTotal = floor(sizeTotal/Predator.lives*100)/100
    sizeAverageText = arialFont.render("sizeAverage : "+str(sizeTotal),True,color_Black)
    screen.blit(cellLivesText, (100,70))
    screen.blit(GenerationText, (100,170))
    screen.blit(sizeAverageText, (100,270))
    for cells in CellList:
        cells.display()
        cells.updatingStatus()
        cells.fT+=1
        if cells.fT==cells.randT:
            cells.move(random.randint(0,1820),random.randint(0,980))
            cells.fT=0
            cells.randT=random.randint(StartMovingTime,LimitMovingTime)
        else:
            cells.move(cells.randx,cells.randy)
        if Mananger.gcgTime==LimitGeneratingTime:
            cells.genBaby()
            if cells==CellList[Cell.fGenNs-1]:
                Mananger.gcgTime=0
                Generation+=1
                for predators in PredatorList:
                    if predators.killed<2:
                        PredatorList.remove(predators)
                        Predator.lives-=1
                    elif predators.killed>3:
                        predators.genBaby()
                        predators.killed=0
                    else:
                        predators.killed=0
        else:
            Cell.fGenNs=Cell.lives
        
    for predators in PredatorList:
        predators.display()
        predators.updatingStatus()
        predators.fT+=1
        if predators.fT==predators.randT:
            predators.move(random.randint(0,1820),random.randint(0,980))
            predators.fT=0
            predators.randT=random.randint(StartMovingTime,LimitMovingTime)
        else:
            predators.move(predators.randx,predators.randy)

    if Cell.lives>Predator.lives*30:
        OriginalPredator = random.choice(PredatorList)
        OriginalPredator.divW = random.randrange(-10,10)
        OriginalPredator.divH = random.randrange(-10,10)
        OriginalPredator.divV = random.randrange(-10,10)
        while OriginalPredator.divW==0:
            OriginalPredator.divW=random.randrange(-10,10)
        while OriginalPredator.divH==0:
            OriginalPredator.divH=random.randrange(-10,10)
        while OriginalPredator.divV==0:
            OriginalPredator.divV=random.randrange(-10,10) 
        OriginalPredator.srandw = random.randrange(-floor(OriginalPredator.width*100),floor(OriginalPredator.width*100))/OriginalPredator.divW
        OriginalPredator.srandh = random.randrange(-floor(OriginalPredator.height*100),floor(OriginalPredator.height*100))/OriginalPredator.divH
        OriginalPredator.randv = random.randrange(-floor(OriginalPredator.v*100),floor(OriginalPredator.v*100))/OriginalPredator.divV
        OriginalPredator.baby_width = OriginalPredator.width+OriginalPredator.srandw/(100*2)
        OriginalPredator.baby_height = OriginalPredator.height+OriginalPredator.srandh/(100*2)
        OriginalPredator.baby_v = OriginalPredator.v+OriginalPredator.randv/(100*2)

        PredatorList.append(Predator(OriginalPredator.xpos,OriginalPredator.ypos,OriginalPredator.baby_width,OriginalPredator.baby_height,OriginalPredator.baby_v))
        PredatorList[-1].fT=0
        PredatorList[-1].randx=random.randint(0,1820)
        PredatorList[-1].randy=random.randint(0,980)
        PredatorList[-1].randT=random.randint(StartMovingTime,LimitMovingTime)

    # if Cell.lives<Predator.lives*5:
    #     PredatorList.remove(PredatorList[0])
    #     Predator.lives-=1
    Mananger.destroyCells()
    Mananger.gcgTime+=1

    for e in pg.event.get():
        if e.type == pg.QUIT:
            playin = False #게임 종료
    


    pg.display.update()


pg.quit()
