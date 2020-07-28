# #input [1,2,3]
# #output [1,2,4]

# def increment(arr):
#     length = len(arr) -1
#     for i in range(length, -1, -1):
#         if i == 0:
#             arr[0] = 0
#             arr = [0] + arr
#         if arr[i] == 9:
#             arr[i] = 0
#         else:
#             arr[i] += 1
#             return arr

# a = [9,8,9,9]

# print(increment(a))

#python files to a list
import sys

with open(sys.argv[1]) as f:
    lines = f.read().splitlines()
print(lines)