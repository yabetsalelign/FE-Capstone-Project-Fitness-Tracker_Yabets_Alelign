input_range = input("please enter the maximum number in which you would like your even numbers to be")
max_range = int(input_range)
for num in range(1, max_range + 1):
    if num % 2 == 0:
        print(num)
