from rapidconnect import RapidConnect
rapid = RapidConnect("default-application_59f4c243e4b06b4ed0ef41fb", "7e3cd397-f62d-4603-9b50-0bd0274257c4")

result = rapid.call('MicrosoftComputerVision', 'tagImage', {
	'subscriptionKey': 'cf5877e759af417d971a7bdf693f4846',
	'image': 'http://www.goodwp.com/images/201102/goodwp.com_15364.jpg',
	'region': 'westcentralus'
})

print(result)
