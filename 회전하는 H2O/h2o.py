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

def draw(x, y,color):
    pygame.draw.circle(screen, color, (x + x_offset, y + y_offset), 1)

while True:
    screen.fill((BLACK)) #erase previous donut
    cosB, sinB = math.cos(B), math.sin(B)
    cosA, sinA = math.cos(A), math.sin(A)
    
    for P in range(0,628,15):
        for T1 in range(0,628,15):
            sinP,cosP = math.sin(P/100),math.cos(P/100)
            sinT,cosT = math.sin(T1/100),math.cos(T1/100)
            x2 = r1 * cosT #x coordinate 2D cricle
            y2 = r1 * sinT #y coordinate 2D circle
            z=-x2*sinP
            x = (x2*cosP-130)*cosA+z*sinA
            y = y2
            draw(x,-y+80,WHITE)
            draw(-x,-y+80,WHITE)
        for T3 in range(0,628,15):
            sinP,cosP = math.sin(P/100),math.cos(P/100)
            sinT,cosT = math.sin(T3/100),math.cos(T3/100)
            x2 = (r1+40) * cosT #x coordinate 2D cricle
            y2 = r1 * sinT #y coordinate 2D circle
            z=-x2*sinP
            x = x2*cosP*cosA+z*sinA
            y = y2
            draw(x,(-y-60)*1.5,RED)
        for T4 in range(0,628,23):
            sinP,cosP = math.sin(P/100),math.cos(P/100)
            sinT,cosT = math.sin(T4/100),math.cos(T4/100)
            x2 = (r1-50) * cosT #x coordinate 2D cricle
            y2 = r1 * sinT #y coordinate 2D circle
            z=-x2*sinP
            x = (x2*cosP-60)*cosA+z*sinA
            y = y2
            draw(x,(-y-1200)/5,WHITE)
            draw(-x,(-y-1200)/5,WHITE)
        for T5 in range(0,628,23):
            sinP,cosP = math.sin(P/100),math.cos(P/100)
            sinT,cosT = math.sin(T5/100),math.cos(T5/100)
            x2 = (r1-50) * cosT #x coordinate 2D cricle
            y2 = r1 * sinT #y coordinate 2D circle
            z=-x2*sinP
            x = (x2*cosP-140)*cosA+z*sinA
            y = y2
            draw(x,(-y-800)/5,WHITE)
            draw(-x,(-y-800)/5,WHITE)

        # for T2 in range(0,628,15):
        #     sinP,cosP = math.sin(P),math.cos(P)
        #     sinT,cosT = math.sin(T1),math.cos(T1)
        
    if A != 2:
        A += 0.01 #0.001
        B += 0.0005 #0.0005
    else:
        A = 0
        B = 0
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
