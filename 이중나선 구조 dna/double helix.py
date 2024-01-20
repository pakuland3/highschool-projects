import pygame
import math
from pygame.locals import *
from sys import exit
pygame.init()

WIDTH = 800
HEIGHT = 800
screen = pygame.display.set_mode((WIDTH, HEIGHT))
WHITE = (255,255,255)
RED = (255,0,0)
GREEN = (0,255,0)
YELLOW = (255,255,0)
BLUE = (0,0,255)
BLACK = (0,0,0)

r1 = 65 #radius 2D circle
r2 = 100 #distance from center / radius torus
r3 = int
r4 = int
A, B = 0, 0 #rotation angles x- and z-axis
K2=5000
K1=WIDTH*K2*3/(8*(r1+r2))
term = 10
pm = math.floor(r1*100/term) #math.floor(r1*100/6)
x_offset = WIDTH / 2
y_offset = HEIGHT / 2
uping=1
downing=0

def draw(x, y, color):
    pygame.draw.circle(screen, color, (x + x_offset, y + y_offset), 1)

while True:
    screen.fill((BLACK)) #erase previous donut
    cosB, sinB = math.cos(B), math.sin(B)
    cosA, sinA = math.cos(A), math.sin(A)
    
    for T1 in range(511,785,8): #start T 471 +40
        sinT,cosT = math.sin(T1/100),math.cos(T1/100)
        x2 = -25+r1 * cosT #x coordinate 2D cricle
        y2 = r1 * sinT #y coordinate 2D circle
        z=-x2
        x = x2*cosA+z*sinA
        y = y2
        draw(x,2.4*(-y-61),WHITE)
    for T2 in range(197,471,8): #start T 157 +40
        sinT,cosT = math.sin(T2/100),math.cos(T2/100)
        x2 = 25+r1 * cosT #x coordinate 2D cricle
        y2 = r1 * sinT #y coordinate 2D circle
        z=-x2
        x = x2*cosA+z*sinA
        y = y2
        draw(x,2.4*(-y+61),WHITE)
    for T3 in range(157,431,8): #end T 471 -40
        sinT,cosT = math.sin(T3/100),math.cos(T3/100)
        x2 = 25+r1 * cosT #x coordinate 2D cricle
        y2 = r1 * sinT #y coordinate 2D circle
        z=-x2
        x = x2*cosA+z*sinA
        y = y2
        draw(x,2.4*(-y-61),WHITE)
    for T4 in range(471,745,8): #end T 785 -40
        sinT,cosT = math.sin(T4/100),math.cos(T4/100)
        x2 = -25+r1 * cosT #x coordinate 2D cricle
        y2 = r1 * sinT #y coordinate 2D circle
        z=-x2
        x = x2*cosA+z*sinA
        y = y2
        draw(x,2.4*(-y+61),WHITE)

    for deltax in range(-34,-4,4):
        z=-deltax
        x = deltax*cosA+z*sinA
        y = 125
        draw(x,y,RED)
        draw(x,-y,RED)
    for deltax in range(6,36,4):
        z=-deltax
        x = deltax*cosA+z*sinA
        y = 124
        draw(x,y,BLUE)
        draw(x,-y,BLUE)
    for deltax in range(-34,-4,4):
        z=-deltax
        x = deltax*cosA+z*sinA
        y = 165
        draw(x,y,GREEN)
        draw(x,-y,GREEN)
    for deltax in range(6,36,4):
        z=-deltax
        x = deltax*cosA+z*sinA
        y = 164
        draw(x,y,YELLOW)
        draw(x,-y,YELLOW)
    for deltax in range(-34,-4,4):
        z=-deltax
        x = deltax*cosA+z*sinA
        y = 205
        draw(x,y,RED)
        draw(x,-y,RED)
    for deltax in range(6,36,4):
        z=-deltax
        x = deltax*cosA+z*sinA
        y = 204
        draw(x,y,BLUE)
        draw(x,-y,BLUE)
    for deltax in range(-34,-4,4):
        z=-deltax
        x = deltax*cosA+z*sinA
        y = 85
        draw(x,y,GREEN)
        draw(x,-y,GREEN)
    for deltax in range(6,36,4):
        z=-deltax
        x = deltax*cosA+z*sinA
        y = 84
        draw(x,y,YELLOW)
        draw(x,-y,YELLOW)
    
    if A != 2:
        A += 0.001 #0.001
    else:
        A = 0
    if B !=-2:
        B-= 0.001
    else:
        B=0
    if downing==1:
        K2-=0
    elif uping==1:
        K2+=0
    if uping==1 and K2>10000:
        uping=0
        downing=1
    elif downing==1 and K2<5000:
        uping=1
        downing=0
    for event in pygame.event.get(): #close window when close button is pressed
        if event.type == QUIT:
            exit()

    pygame.display.update() #display changes
