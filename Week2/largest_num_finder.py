def largest_num_finder(numbers):
    if not numbers:
        return None
    largest = numbers[0]
    for num in numbers:
        if num > largest:
            largest = num
    return largest


input_numbers = input("Please enter the numbers separated by spaces: ")
numbers = [int(num) for num in input_numbers.split()]
print("The largest number will be:", largest_num_finder(numbers))
