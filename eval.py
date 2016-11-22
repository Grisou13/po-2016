import sys
from collections import deque
args = deque(sys.argv)
__scriptdata__ = args.popleft()
return eval(__scriptdata__)
