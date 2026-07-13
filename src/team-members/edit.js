/**
 * WordPress dependencies.
 */
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, SelectControl, TextControl } from '@wordpress/components';
import { plus, trash } from '@wordpress/icons';

const SOCIAL_PLATFORMS = [
	{ label: 'Facebook', value: 'facebook' },
	{ label: 'Twitter / X', value: 'twitter' },
	{ label: 'LinkedIn', value: 'linkedin' },
	{ label: 'Instagram', value: 'instagram' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { members } = attributes;

	const blockProps = useBlockProps();

	/**
	 * Update a single field of a specific member.
	 *
	 * @param {number} index Index of the member in the array.
	 * @param {string} field Field name to update.
	 * @param {string} value New value for that field.
	 */
	const updateMemberField = ( index, field, value ) => {
		const updatedMembers = [ ...members ];
		updatedMembers[ index ] = {
			...updatedMembers[ index ],
			[ field ]: value,
		};
		setAttributes( { members: updatedMembers } );
	};

	/**
	 * Update a single field of a specific social link, inside a specific member.
	 *
	 * @param {number} memberIndex Index of the member.
	 * @param {number} linkIndex   Index of the social link inside that member.
	 * @param {string} field       Field name to update ('platform' or 'url').
	 * @param {string} value       New value for that field.
	 */
	const updateSocialLink = ( memberIndex, linkIndex, field, value ) => {
		const updatedMembers = [ ...members ];
		const updatedLinks = [ ...updatedMembers[ memberIndex ].socialLinks ];

		updatedLinks[ linkIndex ] = {
			...updatedLinks[ linkIndex ],
			[ field ]: value,
		};

		updatedMembers[ memberIndex ] = {
			...updatedMembers[ memberIndex ],
			socialLinks: updatedLinks,
		};

		setAttributes( { members: updatedMembers } );
	};

	/**
	 * Add a new social link to a specific member.
	 *
	 * @param {number} memberIndex Index of the member.
	 */
	const addSocialLink = ( memberIndex ) => {
		const updatedMembers = [ ...members ];

		updatedMembers[ memberIndex ] = {
			...updatedMembers[ memberIndex ],
			socialLinks: [
				...updatedMembers[ memberIndex ].socialLinks,
				{ platform: 'facebook', url: '#' },
			],
		};

		setAttributes( { members: updatedMembers } );
	};

	/**
	 * Remove a social link from a specific member.
	 *
	 * @param {number} memberIndex Index of the member.
	 * @param {number} linkIndex   Index of the social link to remove.
	 */
	const removeSocialLink = ( memberIndex, linkIndex ) => {
		const updatedMembers = [ ...members ];

		updatedMembers[ memberIndex ] = {
			...updatedMembers[ memberIndex ],
			socialLinks: updatedMembers[ memberIndex ].socialLinks.filter(
				( _, i ) => i !== linkIndex
			),
		};

		setAttributes( { members: updatedMembers } );
	};

	/**
	 * Add a new empty member to the end of the list.
	 */
	const addMember = () => {
		setAttributes( {
			members: [
				...members,
				{
					imageUrl: '',
					name: 'New Member',
					position: 'Position',
					bio: 'Short bio goes here.',
					socialLinks: [],
				},
			],
		} );
	};

	/**
	 * Remove a member by its index.
	 *
	 * @param {number} index Index of the member to remove.
	 */
	const removeMember = ( index ) => {
		setAttributes( {
			members: members.filter( ( _, i ) => i !== index ),
		} );
	};

	return (
		<div { ...blockProps }>
			<div className="craftblocks-team-grid">
				{ members.map( ( member, index ) => (
					<div key={ index } className="craftblocks-team-card">
						<Button
							icon={ trash }
							label="Remove member"
							className="craftblocks-team-remove-btn"
							onClick={ () => removeMember( index ) }
							isSmall
						/>

						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									updateMemberField( index, 'imageUrl', media.url )
								}
								allowedTypes={ [ 'image' ] }
								value={ member.imageUrl }
								render={ ( { open } ) => (
									<div
										className="craftblocks-team-image"
										onClick={ open }
										style={
											member.imageUrl
												? { backgroundImage: `url(${ member.imageUrl })` }
												: undefined
										}
									>
										{ ! member.imageUrl && (
											<span className="craftblocks-team-image-placeholder">
												Set Photo
											</span>
										) }
									</div>
								) }
							/>
						</MediaUploadCheck>

						<RichText
							tagName="h4"
							className="craftblocks-team-name"
							value={ member.name }
							onChange={ ( value ) => updateMemberField( index, 'name', value ) }
							placeholder="Name..."
						/>

						<RichText
							tagName="p"
							className="craftblocks-team-position"
							value={ member.position }
							onChange={ ( value ) => updateMemberField( index, 'position', value ) }
							placeholder="Position..."
						/>

						<RichText
							tagName="p"
							className="craftblocks-team-bio"
							value={ member.bio }
							onChange={ ( value ) => updateMemberField( index, 'bio', value ) }
							placeholder="Short bio..."
						/>

						<div className="craftblocks-team-social-editor">
							{ member.socialLinks.map( ( link, linkIndex ) => (
								<div key={ linkIndex } className="craftblocks-team-social-row">
									<SelectControl
										value={ link.platform }
										options={ SOCIAL_PLATFORMS }
										onChange={ ( value ) =>
											updateSocialLink( index, linkIndex, 'platform', value )
										}
									/>
									<TextControl
										value={ link.url }
										placeholder="https://..."
										onChange={ ( value ) =>
											updateSocialLink( index, linkIndex, 'url', value )
										}
									/>
									<Button
										icon={ trash }
										label="Remove social link"
										onClick={ () => removeSocialLink( index, linkIndex ) }
										isSmall
									/>
								</div>
							) ) }

							<Button
								icon={ plus }
								variant="secondary"
								isSmall
								onClick={ () => addSocialLink( index ) }
							>
								Add Social Link
							</Button>
						</div>
					</div>
				) ) }
			</div>

			<Button icon={ plus } variant="secondary" onClick={ addMember }>
				Add Team Member
			</Button>
		</div>
	);
}