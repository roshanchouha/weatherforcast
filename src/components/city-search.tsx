
import { Clock, Loader2, Search, XCircle } from 'lucide-react'
import { useState } from 'react'
import { CommandGroup, CommandDialog, CommandEmpty, CommandInput, CommandList, CommandItem, Command, CommandSeparator } from './ui/command'
import { Button } from './ui/button'
import { useSearchLocation } from '../hooks/use-weather'
import { useNavigate } from 'react-router-dom'
import { useSearchHistory } from '../hooks/use-searchHistory'
import type { SearchHistoryItem } from '../hooks/use-searchHistory'
import { format } from 'date-fns'

const CitySearch = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("")
    const navigate = useNavigate()


    const { data: location, isLoading } = useSearchLocation(query)
    const { addHistory, clearhistory, history } = useSearchHistory()
    console.log("location data", location)

    const handleSelect = (cityData: string) => {
        const [lat, lon, name, country] = cityData.split("|")

        //add to search history

        addHistory.mutate({
            query,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country

        })
        setOpen(false)
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
    }
    return (
        <>
            <div className='flex flex-col gap-4'>
                <Button
                    variant="outline"
                    // className='relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
                    onClick={() => setOpen(true)}>
                    <Search className='w-4 h-4 mr-2 ' />
                    Search cities....
                </Button>
                <CommandDialog open={open} onOpenChange={setOpen}  >
                    <Command>
                        <CommandInput
                            value={query}
                            onValueChange={setQuery}
                            placeholder="Type a command or search..."
                        />
                        <CommandList>
                            {query.length > 2 && !isLoading && <CommandEmpty>No results found.</CommandEmpty>}
                            <CommandGroup heading="Favorites">
                                <CommandItem>Calendar</CommandItem>
                            </CommandGroup>
                            {history.length > 0 &&
                                <>
                                    <CommandSeparator />
                                    <CommandGroup heading="Recent Searches">
                                        <div>
                                            <p>Resent Searches</p>
                                            <Button
                                                variant='ghost'
                                                size='sm'
                                                onClick={() => clearhistory.mutate()}
                                            >
                                                <XCircle className='h-4 w-4' />
                                                Clear
                                            </Button>
                                        </div>

                                        {history.map((location: SearchHistoryItem) => {
                                            return (<CommandItem
                                                key={`${location.lat}-${location.lon}`}
                                                value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                                onSelect={handleSelect}

                                            >
                                                <Clock className='w-4 h-4 mr-2 text-muted-foreground' />
                                                <span>{location.name}</span>
                                                {location.state && (
                                                    <span className='text-sm text-muted-foreground'> , {location.state}</span>
                                                )}
                                                <span className='text-sm text-muted-foreground'> , {location.country}</span>
                                                <span className='ml-auto text-xs text-muted-foreground'>
                                                    {format(location.searchedAt, "MMM d,h:mm a")}
                                                </span>

                                            </CommandItem>)
                                        })}
                                    </CommandGroup>
                                </>
                            }
                            <CommandSeparator />
                            {location && location.length > 0 &&
                                <CommandGroup heading="Suggestions">
                                    {isLoading && (
                                        <div className='flex items-center justify-center p-4'>
                                            <Loader2 className='w-4 h-4 animate-spin' />
                                        </div>
                                    )}
                                    {location.map((location) => {
                                        return <CommandItem
                                            key={`${location.lat}-${location.lon}`}
                                            value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                            onSelect={handleSelect}

                                        >
                                            <Search className='w-4 h-4 mr-2 ' />
                                            <span>{location.name}</span>
                                            {location.state && (
                                                <span className='text-sm text-muted-foreground'> , {location.state}</span>
                                            )}
                                            <span className='text-sm text-muted-foreground'> , {location.country}</span>

                                        </CommandItem>
                                    })
                                    }
                                </CommandGroup>}
                        </CommandList>
                    </Command>
                </CommandDialog>
            </div>


        </>
    )
}

export default CitySearch