def sum_finder(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

numbers = [1, 2, 3, 4, 5]
print("The sum of the given list of numbers is:", sum_finder(numbers))

