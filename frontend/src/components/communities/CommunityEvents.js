'use client';
import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { communities } from '../../lib/api';

export default function CommunityEvents({ params, community, fetchCommunity }) {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        event_date: '',
        event_time: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        if (!newEvent.title.trim() || !newEvent.event_date) return;

        try {
            setIsSubmitting(true);
            await communities.createEvent(params.id, {
                ...newEvent,
                event_datetime: `${newEvent.event_date}T${newEvent.event_time || '00:00'}`
            });

            setNewEvent({ title: '', description: '', event_date: '', event_time: '' });
            setShowCreateForm(false);
            fetchCommunity();
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Failed to create event. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEventResponse = async (eventId, response) => {
        try {
            await communities.respondToEvent(eventId, response);
            fetchCommunity();
        } catch (error) {
            console.error('Error responding to event:', error);
            alert('Failed to respond to event. Please try again.');
        }
    };

    return (
        <div className="space-y-6">
            <Card variant="glassmorphism" className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-display font-semibold text-text-primary">Community Events</h3>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setShowCreateForm(!showCreateForm)}
                    >
                        {showCreateForm ? 'Cancel' : 'Create Event'}
                    </Button>
                </div>

                {showCreateForm && (
                    <form onSubmit={handleCreateEvent} className="space-y-4 mb-6 p-4 bg-surface/50 rounded-lg">
                        <Input
                            placeholder="Event title"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            variant="filled"
                            required
                        />
                        <textarea
                            placeholder="Event description"
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                            className="w-full p-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all duration-normal resize-none"
                            rows="3"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                type="date"
                                value={newEvent.event_date}
                                onChange={(e) => setNewEvent({ ...newEvent, event_date: e.target.value })}
                                variant="filled"
                                required
                            />
                            <Input
                                type="time"
                                value={newEvent.event_time}
                                onChange={(e) => setNewEvent({ ...newEvent, event_time: e.target.value })}
                                variant="filled"
                            />
                        </div>
                        <div className="flex gap-3">
                            <Button type="submit" variant="primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Creating...' : 'Create Event'}
                            </Button>
                            <Button type="button" variant="tertiary" onClick={() => setShowCreateForm(false)}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                )}

                <div className="space-y-4">
                    {community.events?.length > 0 ? (
                        community.events.map((event) => (
                            <Card key={event.id} variant="glassmorphism" className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="font-display font-semibold text-text-primary text-lg">{event.title}</h4>
                                        <p className="text-text-secondary text-sm">
                                            {new Date(event.event_datetime).toLocaleDateString()} at {new Date(event.event_datetime).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                                {event.description && (
                                    <p className="text-text-primary mb-4">{event.description}</p>
                                )}
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="primary"
                                        onClick={() => handleEventResponse(event.id, 'going')}
                                    >
                                        Going
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleEventResponse(event.id, 'maybe')}
                                    >
                                        Maybe
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleEventResponse(event.id, 'not_going')}
                                    >
                                        Can&apos;t Go
                                    </Button>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-text-secondary">No events scheduled yet.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}