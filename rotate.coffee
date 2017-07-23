active = false    # true if mouse is down
angle = 0         # target's current angle of rotation
rotation = 0      # amount of last rotation event
startAngle = 0    # starting angle of rotation event
center =          # center point coords of target
  x: 0
  y: 0

document.ontouchmove = (e) -> e.preventDefault()  # prevent scrolling

# Runs when the web page is first opened
init = ->
  target.addEventListener("mousedown", start, false)
  target.addEventListener("mousemove", rotate, false)
  target.addEventListener("mouseup", stop, false)

# Convert radians to degrees
R2D = 180 / Math.PI   

# Set the starting angle of the touch relative to target's center
start = (e) -> 
  e.preventDefault()
  {top, left, height, width} = @getBoundingClientRect()
  center =
    x: left + (width/2)
    y: top + (height/2)
  x = e.clientX - center.x
  y = e.clientY - center.y
  startAngle = R2D * Math.atan2(y, x)
  active = true

# Rotate target
rotate = (e) -> 
  e.preventDefault()
  x = e.clientX - center.x
  y = e.clientY - center.y
  d = R2D * Math.atan2(y, x)
  rotation = d - startAngle
  @style.webkitTransform = "rotate(#{angle + rotation}deg)" if active

# Save the final angle of rotation
stop = -> 
  angle += rotation
  active = false

init()